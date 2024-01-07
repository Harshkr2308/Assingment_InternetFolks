const mongoose = require('mongoose');
const snowflake = require('@theinternetfolks/snowflake');

const communitySchema = new mongoose.Schema({
  id: String,
  name: String,
  slug: String,
  owner: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
