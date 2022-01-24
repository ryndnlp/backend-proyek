const express = require("express");
const router = express.Router();
const { listUser } = require("../../controllers/admin/userController");

router.get("/", listUser);

module.exports = router;
