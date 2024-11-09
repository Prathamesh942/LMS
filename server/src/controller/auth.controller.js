import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if ([username, email, password, role].some((field) => field?.trim() === "")) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser)
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });

  const newUser = new User({
    username,
    email,
    role,
    password,
  });

  newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "email required",
    });
  }
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  const isPasswordValid = await user.comparePasswords(password);

  if (!isPasswordValid)
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });

  const accessToken = await user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select(" -password");

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res.status(200).cookie("accessToken", accessToken, options).json({
    success: true,
    message: "User logged in",
    accessToken,
  });
};

const logoutUser = async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({ success: "true", message: "User logged out" });
};

export { registerUser, loginUser, logoutUser };
