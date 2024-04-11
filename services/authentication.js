const JWT = require("jsonwebtoken");

const secret = "ironman3deep7";

//This is create the token using user info
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageUrl,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
}
//This is validate the token using secret key
function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
