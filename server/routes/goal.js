const auth = require("../middleware/auth");
const Goal = require("../models/goal");

const router = require("express").Router();

router.get("/all", auth, async (req, res) => {
  try {
    const goals = await Goal.findAll({
      where: { user_id: req.user.id },
    });
    res.status(200).json(goals);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id, {
      where: { user_id: req.user.id },
    });
    if (!goal) return res.status(404).json({ error: "Does not exist" });
    res.status(200).json(goal);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    await Goal.create({ ...req.body, user_id: req.user.id });
    return res.status(201).send("success");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id, {
      where: { user_id: req.user.id },
    });
    if (!goal) return res.status(404).json({ error: "Does not exist" });
    await goal.update(req.body);
    res.status(200).json(goal);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id, {
      where: { user_id: req.user.id },
    });
    if (!goal) return res.status(404).json({ error: "Does not exist" });
    await goal.destroy();
    res.status(200).send("success");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
