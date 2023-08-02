import User from "../model/user.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userCheck = await User.findOne({ username });
    if (userCheck) {
      return res.json({
        message: "Username Already in use",
        status: false,
      });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      //conflict so status will be 409
      return res.json({
        message: "Email Already Exist",
        status: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 12); //can use any salt value it is just for encryption
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    // console.log(user);
    delete user.password;
    return res.status(201).json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const firebaseLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    // if (email) {
    const user = await User.findOne({ email });
    if (user) {
      delete user.password;
      return res.status(200).json({ status: true, user });
    } else {
      return res.json({
        status: false,
        msg: "Email is not in database,Welcome",
      });
    }
    // }
  } catch (err) {
    next(err);
  }
};

export const userCheck = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.json({ status: false, msg: "Username is already there " });
    } else {
      return res
        .status(201)
        .json({ status: true, msg: "Username is available" });
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: "No such Username exist!",
        status: false,
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.json({
        message: "Incorrect Password",
        status: false,
      });
    }
    delete user.password;
    return res.status(201).json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userInfo = await User.findByIdAndUpdate(userId, {
      HasAvatarImage: true,
      avatarImage,
    });
    return res.json({
      avatarSet: userInfo.HasAvatarImage,
      image: userInfo.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
