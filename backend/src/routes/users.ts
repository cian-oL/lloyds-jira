import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import User from "../models/user";
import verifyToken from "../middleware/auth";

const router = express.Router();

// /api/users/register
router.post(
  "/register",
  [
    check("racfid", "Employee ID begins with L and contains 6 numbers").matches(
      /L\d{6}/
    ),
    check(
      "password",
      "Passwords must meet strong password criteria"
    ).isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    check("firstName", "First Name is required").notEmpty().isString(),
    check("lastName", "Last Name is required").notEmpty().isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      const { racfid } = req.body;

      let user = await User.findOne({ racfid });
      if (user) {
        res.status(400).json({ message: "User already exists" });
      }
      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1h" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      });

      return res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// /api/users
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// /api/users/profile
router.get("/profile", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// /api/users/profile
router.put("/profile", verifyToken, async (req: Request, res: Response) => {
  try {
    const { racfid, firstName, lastName, password } = req.body;

    const existingUser = await User.findOne({ racfid });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.password = password;
    await existingUser.save();

    return res.status(200).json(existingUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
