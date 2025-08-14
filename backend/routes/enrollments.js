const express = require("express")
const router = express.Router()
const Enrollment = require("../models/Enrollment")
const Course = require("../models/Course")
const User = require("../models/User")

// Create new enrollment
router.post("/", async (req, res) => {
  try {
    const { userId, courseId, studentDetails } = req.body

    // Check if user is already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId })
    if (existingEnrollment) {
      return res.status(400).json({ message: "User is already enrolled in this course" })
    }

    // Verify course exists
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Verify user exists
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Create enrollment
    const enrollment = new Enrollment({
      userId,
      courseId,
      studentDetails,
    })

    const savedEnrollment = await enrollment.save()

    // Update course student count
    await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } })

    // Populate the enrollment with course and user details
    const populatedEnrollment = await Enrollment.findById(savedEnrollment._id)
      .populate("courseId", "title instructor")
      .populate("userId", "name email")

    res.status(201).json(populatedEnrollment)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "User is already enrolled in this course" })
    }
    res.status(400).json({ message: error.message })
  }
})

// Get all enrollments for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.params.userId })
      .populate("courseId", "title description image price instructor category level")
      .sort({ enrollmentDate: -1 })

    res.json(enrollments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all enrollments for a course
router.get("/course/:courseId", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ courseId: req.params.courseId })
      .populate("userId", "name email")
      .sort({ enrollmentDate: -1 })

    res.json(enrollments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single enrollment
router.get("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate("courseId", "title description image price instructor")
      .populate("userId", "name email")

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" })
    }

    res.json(enrollment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update enrollment progress
router.put("/:id/progress", async (req, res) => {
  try {
    const { progress, lessonId } = req.body

    const enrollment = await Enrollment.findById(req.params.id)
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" })
    }

    enrollment.progress = progress

    if (lessonId) {
      enrollment.completedLessons.push({
        lessonId,
        completedAt: new Date(),
      })
    }

    // Mark as completed if progress is 100%
    if (progress >= 100) {
      enrollment.status = "completed"
      enrollment.certificateIssued = true
      enrollment.certificateIssuedAt = new Date()
    }

    const updatedEnrollment = await enrollment.save()
    res.json(updatedEnrollment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete enrollment (unenroll)
router.delete("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" })
    }

    // Update course student count
    await Course.findByIdAndUpdate(enrollment.courseId, { $inc: { studentsCount: -1 } })

    await Enrollment.findByIdAndDelete(req.params.id)
    res.json({ message: "Enrollment deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
