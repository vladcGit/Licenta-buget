const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/category", require("./category"));
router.use("/goal", require("./goal"));
router.use("/investment", require("./investment"));
router.use("/transaction", require("./transaction"));

module.exports = router;
