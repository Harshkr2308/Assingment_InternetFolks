const express = require('express');
const router = express.Router();
const User = require('../db/user');


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    const responseData = {
      meta: { total: users.length, pages: 1, page: 1 },
      data: users,
    };

    res.status(200).json({ status: true, content: responseData });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

module.exports = router;
