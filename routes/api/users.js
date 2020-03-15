const express = require("express");
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));


module.exports = router;
