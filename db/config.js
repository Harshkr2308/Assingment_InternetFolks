const mongoose = require("mongoose");
const uri = "mongodb://0.0.0.0:27017/internet-folks";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("Could not connect", err);
  });
