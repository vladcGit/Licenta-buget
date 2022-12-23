const { Op } = require("sequelize");
const auth = require("../middleware/auth");
const Transaction = require("../models/transaction");

const router = require("express").Router();

router.get("/all", auth, async (req, res) => {
  try {
    let { recurrent, category, date, minAmount, maxAmount, type } = req.query;

    if (minAmount === undefined) minAmount = Number.MIN_SAFE_INTEGER;
    else minAmount = Number.parseFloat(minAmount);
    if (maxAmount === undefined) maxAmount = Number.MAX_SAFE_INTEGER;
    else maxAmount = Number.parseFloat(maxAmount);

    if (recurrent === "false") recurrent = false;
    if (recurrent === "true") recurrent = true;
    if (category) category = Number.parseInt(category);
    if (date) date = new Date(date);

    let transactions = await Transaction.findAll({
      where: {
        user_id: req.user.id,
        amount: {
          [Op.between]: [minAmount, maxAmount],
        },
      },
    });

    if (recurrent !== undefined)
      transactions = transactions.filter(
        (t) => t.dataValues.recurrent == recurrent
      );
    if (category)
      transactions = transactions.filter(
        (t) => t.dataValues.category_id === category
      );
    if (type)
      transactions = transactions.filter((t) => t.dataValues.type === type);
    if (date)
      transactions = transactions.filter((t) => {
        const dbDate = new Date(t.dataValues.date);
        return (
          dbDate.getDate() === date.getDate() &&
          dbDate.getMonth() === date.getMonth() &&
          dbDate.getFullYear() === date.getFullYear()
        );
      });

    res.status(200).json(transactions);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/monthly", auth, async (req, res) => {
  try {
    let { date } = req.query;

    if (date) date = new Date(date);
    else date = new Date();

    const transactions = await Transaction.findAll({
      where: { user_id: req.user.id },
      raw: true,
    });

    const predicate = (t) =>
      new Date(t.date).getMonth() === date.getMonth() ||
      (t.recurrent && new Date(t.date) <= date);

    const thisMonth = transactions.filter(predicate);

    const inflow = thisMonth.filter((t) => t.type === "Inflow");
    const outflow = thisMonth.filter((t) => t.type === "Outflow");

    res.status(200).json({ inflow, outflow, date });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/last-week", auth, async (req, res) => {
  try {
    const { day, month, year } = req.query;
    if (!day || !month || !year)
      return res.status(400).json({ error: "Date provided is invalid" });

    const result = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(year, month, day - i);
      const transactions = await Transaction.findAll({
        where: { type: "Outflow" },
      });

      const filtered = transactions.filter((t) => {
        const dbDate = new Date(t.date);
        return (
          dbDate.getDate() === date.getDate() &&
          dbDate.getMonth() === date.getMonth() &&
          dbDate.getFullYear() === date.getFullYear()
        );
      });

      const sumOfSpendings = filtered
        .map((t) => t.dataValues.amount)
        .reduce((partialSum, a) => partialSum + a, 0);
      result.push(sumOfSpendings);
    }

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/balance", auth, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: req.user.id },
      raw: true,
    });
    if (!transactions) return res.status(404).json({ error: "Does not exist" });

    const sum = (v) =>
      v.map((t) => t.amount).reduce((partialSum, a) => partialSum + a, 0);

    const monthsDifference = (a, b) =>
      (a.getFullYear() - b.getFullYear()) * 12 -
      b.getMonth() +
      a.getMonth() +
      1;

    const inflowNonRecurrentSum = sum(
      transactions.filter((t) => t.type === "Inflow" && !t.recurrent)
    );

    const outflowNonRecurrentSum = sum(
      transactions.filter((t) => t.type === "Outflow" && !t.recurrent)
    );

    const inflowRecurrentSum = transactions
      .filter((t) => t.type === "Inflow" && t.recurrent)
      .map((t) => t.amount * monthsDifference(new Date(), new Date(t.date)))
      .reduce((partialSum, a) => partialSum + a, 0);

    const outflowRecurrentSum = transactions
      .filter((t) => t.type === "Outflow" && t.recurrent)
      .map((t) => t.amount * monthsDifference(new Date(), new Date(t.date)))
      .reduce((partialSum, a) => partialSum + a, 0);

    res.status(200).json({
      balance:
        inflowNonRecurrentSum +
        inflowRecurrentSum -
        outflowNonRecurrentSum -
        outflowRecurrentSum,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      where: { user_id: req.user.id },
    });
    if (!transaction) return res.status(404).json({ error: "Does not exist" });
    res.status(200).json(transaction);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    await Transaction.create({ ...req.body, user_id: req.user.id });
    return res.status(201).send("success");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      where: { user_id: req.user.id },
    });
    if (!transaction) return res.status(404).json({ error: "Does not exist" });
    await transaction.update(req.body);
    res.status(200).json(transaction);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      where: { user_id: req.user.id },
    });
    if (!transaction) return res.status(404).json({ error: "Does not exist" });
    await transaction.destroy();
    res.status(200).send("success");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
