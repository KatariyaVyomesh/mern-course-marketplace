const express = require("express")
const router = express.Router()
const User = require("../models/User")

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("enrolledCourses.courseId")
      .populate("createdCourses")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user profile
router.put("/:id", async (req, res) => {
  try {
    const { password, ...updateData } = req.body

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select(
      "-password",
    )

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Enroll in course
router.post("/:id/enroll/:courseId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const courseId = req.params.courseId

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if already enrolled
    const alreadyEnrolled = user.enrolledCourses.some((course) => course.courseId.toString() === courseId)

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" })
    }

    user.enrolledCourses.push({ courseId })
    await user.save()

    res.json({ message: "Successfully enrolled in course" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
