import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controller/auth.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/checkAuth").get(verifyJwt, (req, res) => {
  if (req.user) {
    return res.status(200).json({
      authenticate: true,
      user: req.user,
    });
  } else {
    return res.status(401).json({
      authenticate: false,
      user: null,
    });
  }
});

export default router;
