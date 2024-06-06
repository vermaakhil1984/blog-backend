const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//GET All Blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      res.status(200).send({
        mesage: "No blogs found",
        success: false,
      });
    }
    return res.status(200).send({
      mesage: "All blogs list",
      success: true,
      blogCount: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      mesage: "Error while getting blogs",
      success: false,
      error,
    });
  }
};
//Create Blogs
exports.CreateBlogsController = async (req, res) => {
  try {
    const { title, image, description, user } = req.body;
    if (!title || !image || !description || !user) {
      return res.status(400).send({
        mesage: "Please provide all fields",
        success: false,
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        mesage: "Unable to find user",
        success: false,
      });
    }
    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      mesage: "New blogs created",
      success: true,
      user: "new",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      mesage: "Error while creating blogs",
      success: false,
      error,
    });
  }
};
//Single Blogs
exports.getBlogByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        mesage: "Blog not found",
        success: false,
      });
    }
    res.status(200).send({
      mesage: "Fetch single blog",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      mesage: "Error while getting single blog",
      success: false,
      error,
    });
  }
};
//Update Blogs
exports.updateBlogsController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      mesage: "Blog updated",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      mesage: "Error while updating blogs",
      success: false,
      error,
    });
  }
};
//Delete Blogs
exports.deleteBlogsController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      mesage: "Blog deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      mesage: "Error while deleting blog",
      success: false,
    });
  }
};
// GET User blog
exports.getUserBlogByID = async (req, res) => {
  const { id } = req.params;
  try {
    const userBlog = await userModel.findById(id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        mesage: "Blog Not Found by Id",
        success: false,
      });
    }
    return res.status(200).send({
      mesage: "User blogs",
      success: true,
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      mesage: "Error in user blog",
      success: false,
    });
  }
};
