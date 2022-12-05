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
