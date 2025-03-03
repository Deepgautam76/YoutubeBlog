const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication");
//For encript the password
const { createHmac, randomBytes } = require("crypto");

//This is schema for NewUser
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);


//     HERE IS USING THE HASHING FOR THE PASSWORD     //

//This whole procedure for hash the password
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

//This method check password and email before login
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    //Fetch user from db using email
    const user = await this.findOne({ email });
    if (!user) throw new Error("User Not Found!");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (hashedPassword !== userProvidedHash)
      throw new Error("Password Incorrect");

    const token=createTokenForUser(user);
    return token;
  }
);

// Here is the exporting the schema
const User = model("user", userSchema);
module.exports = User;
