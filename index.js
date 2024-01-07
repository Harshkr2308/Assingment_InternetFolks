const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("./db/config");

app.use(bodyParser.json());

const authRouter = require("./routes/auth");
const communityRouter = require("./routes/community");
const roleRouter = require("./routes/role");
const userRouter = require("./routes/user");
const useMember = require("./routes/member");

app.use("/auth", authRouter);
app.use("/community", communityRouter);
app.use("/role", roleRouter);
app.use("/user", userRouter);
app.use("/member", useMember);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
