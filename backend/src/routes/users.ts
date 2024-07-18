import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import User from "../models/user";

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
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
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
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1h" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      });

      return res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
