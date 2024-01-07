const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../db/user");
const middleware = require("../AuthMiddleware/authenticateToken");
const jwt_key = "Harsh";

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(200).json({
      status: true,
      content: {
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, jwt_key, { expiresIn: "1h" });

      res.status(200).json({
        status: true,
        content: {
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            token,
          },
        },
      });
    } else {
      res.status(401).json({ status: false, error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

router.get("/me", middleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    res.status(200).json({
      status: true,
      content: {
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

module.exports = router;
