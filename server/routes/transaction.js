const auth = require("../middleware/auth");
const Transaction = require("../models/transaction");

const router = require("express").Router();

router.get("/all", auth, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: req.user.id },
    });
    res.status(200).json(transactions);
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
