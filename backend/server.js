const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB connection - removed deprecated options for better compatibility
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/courseplatform")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes with error handling
try {
  console.log("Loading routes...")
  const coursesRouter = require("./routes/courses")
  console.log("Courses router loaded")
  const usersRouter = require("./routes/users")
  console.log("Users router loaded")
  const authRouter = require("./routes/auth")
  console.log("Auth router loaded")
  const enrollmentsRouter = require("./routes/enrollments")
  console.log("Enrollments router loaded")

  app.use("/api/courses", coursesRouter)
  app.use("/api/users", usersRouter)
  app.use("/api/auth", authRouter)
  app.use("/api/enrollments", enrollmentsRouter)
  console.log("All routes registered successfully")
} catch (error) {
  console.error("Error loading routes:", error.message)
  console.error("Stack trace:", error.stack)
  process.exit(1)
}

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Course Platform API is running!" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
