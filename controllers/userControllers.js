const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
// get All User
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).send({
      mesage: "All User Data",
      success: true,
      userCount: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      mesage: "Error in  Get All User ",
      success: false,
      error,
    });
  }
};
//create User
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        mesage: "Please fill all fields",
        success: false,
      });
    }
    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        mesage: "User already exist Please Login",
      });
    }
    //hashed password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ username, email, password: hashPassword });
    await user.save();
    console.log(user);
    return res.status(201).send({
      mesage: "New User Created",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      mesage: "Error in Register calback ",
      success: false,
      error,
    });
  }
};
//Login User
exports.loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        mesage: "Please Provide Email & Password ",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        mesage: "Email is not registerd",
        success: false,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).send({
        mesage: "Invalid Email or Password",
        success: false,
      });
    }
    return res.status(200).send({
      mesage: "Login Successfully",
      success: true,
      user,
    });
  } catch (error) {}
};
