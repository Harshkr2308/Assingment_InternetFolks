// authenticateToken.js
const jwt = require("jsonwebtoken");
const jwt_key = "Harsh";
function authenticateToken(req, res, next) {
  let token = req.header("authorization");
  
  if (!token)
    return res.status(401).json({ status: false, error: "Access denied" });
  token = token.split(" ")[1];
  jwt.verify(token, jwt_key, (err, user) => {
    if (err)
      return res.status(403).json({ status: false, error: "Invalid token" });

    req.userId = user.id;

    next();
  });
}

module.exports = authenticateToken;
