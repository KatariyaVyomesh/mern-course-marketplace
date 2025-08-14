const express = require("express")
const router = express.Router()
const Course = require("../models/Course")
const mongoose = require("mongoose") // Required for mongodb connection status

// Get all courses
router.get("/", async (req, res) => {
  try {
    const { search, category, level, priceRange } = req.query
    const query = {}

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // Category filter
    if (category && category !== "All Categories") {
      query.category = category
    }

    // Level filter
    if (level && level !== "All Levels") {
      query.level = level
    }

    // Price range filter
    if (priceRange && priceRange !== "all") {
      switch (priceRange) {
        case "free":
          query.price = 0
          break
        case "under-50":
          query.price = { $lt: 50 }
          break
        case "50-100":
          query.price = { $gte: 50, $lte: 100 }
          break
        case "over-100":
          query.price = { $gt: 100 }
          break
      }
    }

    const courses = await Course.find(query).sort({ createdAt: -1 })
    res.json(courses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single course
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }
    res.json(course)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new course
router.post("/", async (req, res) => {
  try {
    console.log("=== Course Creation Debug ===")
    console.log("Request body:", JSON.stringify(req.body, null, 2))
    console.log("Request headers:", req.headers)

    const course = new Course(req.body)
    console.log("Course object created:", JSON.stringify(course, null, 2))

    const savedCourse = await course.save()
    console.log("Course saved successfully:", savedCourse._id)

    res.status(201).json(savedCourse)
  } catch (error) {
    console.error("=== Course Creation Error ===")
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)
    console.error("Validation errors:", error.errors)

    res.status(400).json({
      message: error.message,
      errors: error.errors,
      details: "Check server logs for more information",
    })
  }
})

// Update course
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }
    res.json(course)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete course
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }
    res.json({ message: "Course deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/test", (req, res) => {
  res.json({
    message: "Course API is working!",
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  })
})

module.exports = router
