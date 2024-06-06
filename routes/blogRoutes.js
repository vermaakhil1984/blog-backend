const express = require("express");
const {
  getAllBlogsController,
  CreateBlogsController,
  updateBlogsController,
  deleteBlogsController,
  getBlogByIdController,
  getUserBlogByID,
} = require("../controllers/blogControlers");

const router = express.Router();
// get all Blogs || GET
router.get("/all-blog", getAllBlogsController);

// create Blog || POST
router.post("/create-blog", CreateBlogsController);

//Update       || PUT
router.put("/update-blog/:id", updateBlogsController);

// Single Blog || GET
router.get("/get-blog/:id", getBlogByIdController);

//Delete Blog   || delete
router.delete("/delete-blog/:id", deleteBlogsController);

// user blog    ||GET
router.get("/user-blog/:id", getUserBlogByID);
module.exports = router;
