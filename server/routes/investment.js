const auth = require("../middleware/auth");
const Investment = require("../models/investment");

const router = require("express").Router();

router.get("/all", async (req, res) => {
  try {
    const investments = await Investment.findAll({
      where: { user_id: req.user.id },
    });
    res.status(200).json(investments);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const investments = await Investment.findByPk(req.params.id, {
      where: { user_id: req.user.id },
    });
    if (!investments) return res.status(404).json({ error: "Does not exist" });
    res.status(200).json(investments);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    await Investment.create({ ...req.body, user_id: req.user.id });
    return res.status(201).send("success");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const investment = await Investment.findByPk(req.params.id, {
      where: { user_id: req.user.id },
    });
    if (!investment) return res.status(404).json({ error: "Does not exist" });
    await investment.update(req.body);
    res.status(200).json(investment);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const investment = await Investment.findByPk(req.params.id, {
      where: { user_id: req.user.id },
    });
    if (!investment) return res.status(404).json({ error: "Does not exist" });
    await investment.destroy();
    res.status(200).send("success");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
