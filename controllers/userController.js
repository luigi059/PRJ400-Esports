import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  console.log("Welcome to Register");
  try {
    const { name, email, password, dob, nationality, position, discoverable } =
      req.body;
    // 1) validation
    if (
      !name ||
      !email ||
      !password ||
      !dob ||
      !nationality ||
      !position ||
      discoverable == undefined
    )
      return res.status(400).json({ msg: "All Fields Required" });
    // 2) Check if existing user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "This email already exists." });
    // 3) Password validator
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password is at least 6 characters long." });
    // 4) Password Encryption
    const passwordHash = await bcrypt.hash(password, 10);
    // 5) if everything is ok, create a new user and save to mongoDB
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      dob,
      nationality,
      position,
      discoverable,
    });
    await newUser.save();
    // Then create jsonwebtoken for authentication
    const accessToken = createAccessToken({ id: newUser._id });
    const refreshToken = createRefreshToken({ id: newUser._id });
    // Creates cookie for authentication
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      path: "/user/refresh_token",
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  console.log("Welcome to LogIn");
  try {
    const { email, password } = req.body;
    // 1) validation
    if (!email || !password)
      return res.status(400).json({ msg: "All Fields Required" });
    // 2) Check if existing user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist!" });
    // 3) Password validation
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password!" });

    // if everything is okay,then create tokens for authentication
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });
    // Creates cookie for authentication
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      path: "/user/refresh_token",
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Getting User Info
const getUser = async (req, res) => {
  console.log("Welcome to GetUsers");
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: "User does not exist!" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Authentication via cookies
const refreshToken = (req, res) => {
  console.log("Welcome to refreshToken");
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res.status(400).json({ msg: "Please Login or Register" });
    // Verifying cookie
    jwt.verify(rf_token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });
      const accessToken = createAccessToken({ id: user.id });
      res.json({ user, accessToken });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Creating jwt tokens
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export default { register, login, getUser, logout, refreshToken };
