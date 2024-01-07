const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const slugify = require("slugify");
const Community = require("../db/community");
const Member = require("../db/member");
const middleware = require("../AuthMiddleware/authenticateTokeen");

router.post("/", middleware, async (req, res) => {
  try {
    const { name } = req.body;
    const ownerId = req.userId;
    const slug = slugify(name, { lower: true });
    const community = await Community.create({ name, slug, owner: ownerId });

    await Member.create({
      community: name,
      user: ownerId,
      role: "Community Admin",
    });

    res.status(200).json({
      status: true,
      content: {
        data: {
          id: community._id,
          name: community.name,
          slug: community.slug,
          owner: community.owner,
          created_at: community.created_at,
          updated_at: community.updated_at,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const communities = await Community.find();
    const responseData = {
      meta: { total: communities.length, pages: 1, page: 1 },
      data: communities,
    };
    res.status(200).json({ status: true, content: responseData });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

router.get("/:id/members", async (req, res) => {
  try {
    const members = await Member.find({ community: req.params.id }).populate(
      "user role",
      "id name"
    );
    const responseData = {
      meta: { total: members.length, pages: 1, page: 1 },
      data: members,
    };
    res.status(200).json({ status: true, content: responseData });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

router.get("/me/owner", middleware, async (req, res) => {
  try {
    const ownerId = req.userId;

    const ownedCommunities = await Community.find({ owner: ownerId });
    const responseData = {
      meta: { total: ownedCommunities.length, pages: 1, page: 1 },
      data: ownedCommunities,
    };
    res.status(200).json({ status: true, content: responseData });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

router.get("/me/member", middleware, async (req, res) => {
  try {
    const memberId = req.userId;

    const joinedCommunities = await Member.find({ user: memberId });
    const responseData = {
      meta: { total: joinedCommunities.length, pages: 1, page: 1 },
      data: joinedCommunities,
    };
    res.status(200).json({ status: true, content: responseData });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

module.exports = router;
