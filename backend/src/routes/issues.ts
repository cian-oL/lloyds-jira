import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import Issue from "../models/issue";
import verifyToken from "../middleware/auth";

const router = express.Router();

// /api/issues/create-issue
router.post(
  "/create-issue",
  verifyToken,
  [
    check("issueCode", 'Written in format "LJ-XXXXXX" with 6 numbers').matches(
      /LJ-\d{6}/
    ),
    check("name", "Issue Name is required").notEmpty().isString(),
    check("description", "Issue Description is required").notEmpty().isString(),
    check("storyPoints").notEmpty().isNumeric(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      const { issueCode } = req.body;

      let issue = await Issue.findOne({ issueCode });
      if (issue) {
        return res.status(409).json({ message: "Issue already exists" });
      }

      issue = new Issue(req.body);
      issue.createdAt = new Date();
      issue.lastUpdated = new Date();
      await issue.save();

      return res.status(201).json(issue);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// /api/issues
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const issues = await Issue.find({});

    return res.status(200).json(issues);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:issueCode", verifyToken, async (req: Request, res: Response) => {
  try {
    const { issueCode } = req.params;

    const issue = await Issue.findOne({ issueCode });
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    return res.status(200).json(issue);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/:issueCode", verifyToken, async (req: Request, res: Response) => {
  try {
    const { issueCode } = req.params;
    const {
      issueCategory,
      name,
      description,
      storyPoints,
      assignee,
      columnId,
    } = req.body;

    const existingIssue = await Issue.findOne({ issueCode });
    if (!existingIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    existingIssue.issueCategory = issueCategory;
    existingIssue.name = name;
    existingIssue.description = description;
    existingIssue.storyPoints = storyPoints;
    existingIssue.assignee = assignee;
    existingIssue.columnId = columnId;
    await existingIssue.save();

    return res.status(200).json(existingIssue);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete(
  "/:issueCode",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { issueCode } = req.params;

      const issueToDelete = await Issue.findOneAndDelete({ issueCode });
      if (!issueToDelete) {
        return res.status(404).json({ message: "Issue not found" });
      }

      return res.status(204).json({ message: "Issue deleted" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
