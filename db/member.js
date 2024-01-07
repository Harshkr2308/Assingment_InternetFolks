const mongoose = require('mongoose');
const snowflake = require('@theinternetfolks/snowflake');

const memberSchema = new mongoose.Schema({
  id: String,
  community: String,
  user: String,
  role: String,
  created_at: { type: Date, default: Date.now },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
