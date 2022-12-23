const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const User = require("../models/user");
const Goal = require("../models/goal");
const Transaction = require("../models/transaction");
const Investment = require("../models/investment");
const { Op } = require("sequelize");

require("dotenv").config();

const secret = process.env.SECRET || "secret";

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nou = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    return res.status(201).json(nou);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

//primeste datele de autentificare si intoarce un token de acces
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email: email },
      raw: true,
    });
    if (!user) return res.status(400).json({ eroare: "Does not exist" });

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, secret);
      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ error: "Incorrect password" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

router.post("/total-balance", auth, async (req, res) => {
  try {
    let { date } = req.body;

    const transactions = await Transaction.findAll({
      where: { user_id: req.user.id, date: { [Op.lte]: date } },
      raw: true,
    });

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
      .map((t) => t.amount * monthsDifference(new Date(date), new Date(t.date)))
      .reduce((partialSum, a) => partialSum + a, 0);

    const outflowRecurrentSum = transactions
      .filter((t) => t.type === "Outflow" && t.recurrent)
      .map((t) => t.amount * monthsDifference(new Date(date), new Date(t.date)))
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

router.get("/", auth, async (req, res) => {
  try {
    if (!req.header("Authorization")) return;
    else return res.status(200).json(req.user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

router.get("/monthly-income", auth, async (req, res) => {
  try {
    const recurrentTransactions = await Transaction.findAll({
      where: {
        user_id: req.user.id,
        recurrent: true,
        type: "Inflow",
      },
      raw: true,
    });

    const sumOfReccurentTransactions = recurrentTransactions
      .filter((t) => new Date(t.date) < new Date())
      .map((t) => t.amount)
      .reduce((partialSum, a) => partialSum + a, 0);

    const nonRecurrentTransactions = await Transaction.findAll({
      where: {
        user_id: req.user.id,
        recurrent: false,
        type: "Inflow",
      },
      raw: true,
    });

    const nonRecurrentTransactionsThisMonth = nonRecurrentTransactions.filter(
      (t) => new Date(t.date).getMonth() == new Date().getMonth()
    );

    const sumOfNonReccurentTransactions = nonRecurrentTransactionsThisMonth
      .map((t) => t.amount)
      .reduce((partialSum, a) => partialSum + a, 0);

    res.status(200).json({
      amount: sumOfReccurentTransactions + sumOfNonReccurentTransactions,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    if (!req.header("Authorization")) return;
    const user = await User.findByPk(req.params.id, {
      include: [Goal, Transaction, Investment],
      attributes: { exclude: ["parola"] },
    });
    if (!user) return res.status(400).json({ error: "Does not exist" });
    else return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

module.exports = router;
