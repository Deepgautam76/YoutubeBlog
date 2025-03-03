//This is for confing the .env file
require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//Import  blogs
const Blog = require("./models/blog");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const {
  chechForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
//This is dynamin PORT assign process(process.env.PORT)
//This is usefull when deploy application on the Cloud
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("Mongodb Connected"))
  .catch((error) => console.log("MongoDB geting the error:", error));

app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(chechForAuthenticationCookie("token"));

//Middleware for serving Static resourse like public folder image
app.use(express.static(path.resolve("./public")));

//This route render home page and fetch all blog thats are created
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

//Here all route
app.use("/user", userRoute);
app.use("/blog", blogRoute);

//Here whole app listen
app.listen(PORT, () => console.log(`Server Started at PORT :${PORT}`));
