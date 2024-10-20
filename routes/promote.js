const express = require("express");
const router = express.Router();

router.post("/", require("../controllers/auth/promote"));

module.exports = router;