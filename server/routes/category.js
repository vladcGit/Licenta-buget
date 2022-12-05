const auth = require("../middleware/auth");
const Category = require("../models/category");
const Transaction = require("../models/transaction");

const router = require("express").Router();

router.get("/all", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: { model: Transaction, where: { user_id: req.user.id } },
    });
    if (!category) return res.status(404).json({ error: "Does not exist" });
    res.status(200).json(category);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    await Category.create(req.body);
    return res.status(201).send("success");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
