const { Router } = require("express");
const User = require("../models/user");

// Here is the create object of imported router
const router = Router();


//This route render login(signin) page for user
router.get("/signin", (req, res) => {
  return res.render("signin");
});

//This route render signup page for user
router.get("/signup", (req, res) => {
  return res.render("signup");
});

//This is credantial for login(signin) the user with email and password
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    // console.log("Token :", token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email And Password",
    });
  }
});

//This routes for logout the profile of user
router.get("/logout", async (req, res) => {
  res.clearCookie("token").redirect("/");
});

//This is credantial for creating the account
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  // return res.redirect("/");
  return res.render("signin")
});


module.exports = router;
