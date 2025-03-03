const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

//multer use for the storing CoverImage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

//This is the route for adding new blog page loading...
router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

//Route for NavBar Home button of view
router.get("/#", (req, res) => {
  res.redirect("/blog");
});

//This route fetch the all blogs and comments
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments=await Comment.find({blogId:req.params.id}).populate("createdBy")
  // console.log("blog" ,blog)
  // console.log("MongoDB Comments:",comments)
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

//This route for Comment create in mongoDB
router.post("/comment/:blogId", async (req, res)=>  {
  const comment= await Comment.create({
    content:req.body.content,
    blogId:req.params.blogId,
    createdBy: req.user._id,
  });
  // console.log("Comments Created ",comment);
  return res.redirect(`/blog/${req.params.blogId}`);
});

//This post route create blog in mongoDB
router.post("/", upload.single("coverImage"), async function (req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  // console.log(req.body);
  // console.log(req.file)
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;


