const path = require("path");
const express = require("express");

const mongoose = require("mongoose");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/blogyfy")
  .then((e) => console.log("Mongodb Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

//middleware inBuild
app.use(express.urlencoded({extended: false }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT :${PORT}`));
