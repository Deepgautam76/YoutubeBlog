const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser");

const userRouter = require("./routes/user");
const { chechForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/blogyfy")
  .then((e) => console.log("Mongodb Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

//middlewares
app.use(express.urlencoded({extended: false }));
app.use(cookieParser());
app.use(chechForAuthenticationCookie("token"))

app.get("/", (req, res) => {
  // console.log(req.user)
  return res.render("home",{
    user:req.user,
  });
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT :${PORT}`));


// video 30 time 12 minute