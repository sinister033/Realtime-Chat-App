import express from "express";
import {
  login,
  setAvatar,
  register,
  getAllUsers,
  firebaseLogin,
  userCheck,
} from "../controllers/user.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/firebaseLogin", firebaseLogin);
router.post("/checkUsername", userCheck);
router.post("/avatar/:id", setAvatar);
router.get("/getAllUsers/:id", getAllUsers);

export default router;
