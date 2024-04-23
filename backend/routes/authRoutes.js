import express from "express";
import { body, validationResult } from "express-validator";
import UserModel from "../models/UsersSchema.js";
import bcrypt from "bcrypt";
import jwtToken from "jsonwebtoken";
import findToken from "../MiddleWare/findToken.js";

const router = express.Router();

router.get("/getAllUser", findToken, async (req, res) => {
  try {
    const userId = await req.user;

    const user = await UserModel.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    if (!user) {
      return res.status(401).send({ msg: "No users found" });
    }

    return res.status(200).json({ Users: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post(
  "/signup",
  [
    body("username")
      .isLength({ min: 5 })
      .withMessage("Username should be at least 5 characters long"),
    body("fullname")
      .isLength({ min: 5 })
      .withMessage("Full name should be at least 5 characters long"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("gender").notEmpty().withMessage("Gender is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let user = await UserModel.findOne({ username: req.body.username });

      if (user) {
        return res.status(401).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      user = await UserModel.create({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
        profilepic:
          req.body.gender == "Male"
            ? `https://avatar.iran.liara.run/public/boy?username=${req.body.username}`
            : `https://avatar.iran.liara.run/public/girl?username=${req.body.username}`,
      });

      const data = {
        user: {
          userId: user.id,
        },
      };
      const secretKey = "VivekIsCollegeStudent";
      const jwt = jwtToken.sign(data, secretKey, {
        expiresIn: "15d", //expiry of token is 15 days
      });

      res.cookie("jwt", jwt, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //Ms
        httpOnly: true, // it means the cookie only accessible through HTTP and not JS or Browser
        sameSite: "Strict", //
        secure: false,
      });

      return res.status(200).send({ jwt });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post(
  "/login",
  [
    body("username")
      .not()
      .isEmpty()
      .isLength({ min: 5 })
      .withMessage("username should be 5 characters long"),
    body("email").isEmail().withMessage("enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password should be at least 5 character long"),
  ],
  async (req, res) => {
    // Implement login functionality here
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res
          .status(400)
          .json({ errors: "Internal Error Occurred In Server" });
      }

      let user = await UserModel.findOne({ username: req.body.username });

      if (!user) {
        return res
          .status(400)
          .json({ error: "Internal Error Occurred with User" });
      }

      const ComparePassword = bcrypt.compare(req.body.password, user.password);

      if (!ComparePassword) {
        return res.status(400).json({ error: "Authonication Denied" });
      }

      const data = {
        user: {
          userId: user.id,
        },
      };

      const secretKey = "VivekIsCollegeStudent";

      const jwt = jwtToken.sign(data, secretKey, {
        expiresIn: "15d", //expiry of token is 15 days
      });

      res.cookie("jwt", jwt, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //Ms
        httpOnly: true,
      });

      return res.status(200).json({ jwt });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

router.get("/userData", findToken, async (req, res) => {
  try {
    const userId = await req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).send({ error: "User Not Found!" });
    }

    return res.status(200).send({ user });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ error: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  // Implement logout functionality here
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).send({
      logout:
        "Logged out successfully! You will be redirected to the home page in a moment.",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
