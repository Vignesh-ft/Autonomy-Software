const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRegisterModel = require("../models/loginModels");
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async (req, res) => {
  console.log("Login request received:", req.body); // Log request body

  const { name, role, password } = req.body.user;
  try {
    const user = await authRegisterModel.findOne({ username: name, role: role });
    console.log("Database query result:", user); // Log database query result

    if (!user) {
      return res.status(404).json({
        isUserExist: false,
        msg: "User or role not found",
        user: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { user: name, role: role },
        JWT_SECRET_KEY
      );
      return res
        .cookie("_token", token, { httpOnly: true, sameSite:"None",secure:true })
        .status(200)
        .json({
          isUserExist: true,
          msg: "User found",
          user: { name: user.username, role: user.role } // Send only necessary data
        });
    }

    return res.status(401).json({
      isUserExist: true,
      msg: "Wrong password!",
      user: null
    });
  } catch (err) {
    console.log("Error during login:", err);
    return res.status(500).json({ operation: "Login failed!", error: err });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('_token');
    res.clearCookie('_user');
    res.status(200).json({ msg: 'cookies deleted!', isCookieDeleted: true });
  } catch (error) {
    return res.status(500).json({ operation: 'logout failed!', error: error });
  }
};


module.exports = { login, logout };
