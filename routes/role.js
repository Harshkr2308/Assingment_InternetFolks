const express = require("express");
const router = express.Router();
const Role = require("../db/role");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const role = await Role.create({ name });

    res.status(200).json({
      status: true,
      content: {
        data: {
          id: role._id,
          name: role.name,
          created_at: role.created_at,
          updated_at: role.updated_at,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    const responseData = {
      meta: { total: roles.length, pages: 1, page: 1 },
      data: roles,
    };
    res.status(200).json({ status: true, content: responseData });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

module.exports = router;
