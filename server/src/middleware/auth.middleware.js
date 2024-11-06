import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJwt = async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return resizeBy.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(" -password");
    if (!user) {
      return resizeBy.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return resizeBy.status(401).json({
      success: false,
      message: "Invalid access token",
    });
  }
};
