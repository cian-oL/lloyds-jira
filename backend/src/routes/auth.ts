import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user";
import verifyToken from "../middleware/auth";

const router = express.Router();

// /api/auth/sign-in
router.post(
  "/sign-in",
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
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      const { racfid, password } = req.body;

      const user = await User.findOne({ racfid });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

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

      return res.status(200).json({ userId: user._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// /api/auth/validate-token
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ userId: req.userId });
});

// /api/auth/sign-out
router.post("/sign-out", (req: Request, res: Response) => {
  res.cookie("auth_token", "", { expires: new Date(0) });
  return res.send();
});

export default router;
