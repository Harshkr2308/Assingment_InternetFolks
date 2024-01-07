const express = require("express");
const router = express.Router();
const Member = require("../db/member");
const authenticateToken = require("../AuthMiddleware/authenticateToken");
const Community = require("../db/community");

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { community, user, role } = req.body;
    const ownedCommunity = await Community.findOne({
      name: community,
      owner: req.userId,
    });

    if (!ownedCommunity) {
      return res
        .status(403)
        .json({ status: false, error: "NOT_ALLOWED_ACCESS" });
    }

    const member = await Member.create({ community, user, role });

    res.status(200).json({
      status: true,
      content: {
        data: {
          id: member._id,
          community: member.community,
          user: member.user,
          role: member.role,
          created_at: member.created_at,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const memberId = req.params.id;
    const memdel = await Member.find({ user: memberId });
    const loggedperson = await Member.find({
      user: req.userId,
      role: "Community Moderator",
    });

    if (
      (!memdel || memdel.length === 0) &&
      (!loggedperson || loggedperson.length == 0)
    ) {
      return res.status(404).json({ status: false, error: "Member not found" });
    }
    loggedperson.forEach((member) => {
      console.log("loingMember community", member.community);
      console.log("loingMember username", member.user);
    });

    const ownedCommunities = await Community.find({ owner: req.userId });

    let flag = false; // if the flag is true then delete that member from the respective

    //i am finding all the community where the respective member to deleted belong to and checking with
    // logged in person belonging  which community.
    memdel.forEach(async (member) => {
      let presentcommunity = member.community;
      const Owner = ownedCommunities.some(
        (community) => community.name === presentcommunity
      );
      let presentcommunity1 = member.community;
      // checking if the logged person is moderator of the community or not
      const Moderator = loggedperson.some(
        (member1) => member1.community === presentcommunity1
      );

      // checking whether the deleted person is not the community admin of respective community
      const check = ownedCommunities.some(
        (elm) => elm.name === presentcommunity
      );
      if (Moderator && !check) {
        flag = true;
        await Member.findOneAndDelete({
          _id: member._id,
          community: presentcommunity1,
        });
      }
      // checking the logged person is owner or not of deleting member belonging community
      if (Owner) {
        flag = true;
        await Member.findOneAndDelete({
          _id: member._id,
          community: presentcommunity,
        });
      }
    });
    // flag is true shows logged person is admin or moderator
    if (!flag) {
      return res
        .status(403)
        .json({ status: false, error: "NOT_ALLOWED_ACCESS" });
    }

    res.status(200).json({
      status: true,
      content: {
        message: "removed successfully.",
      },
    });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

module.exports = router;
