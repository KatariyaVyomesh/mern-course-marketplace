const mongoose = require("mongoose")

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    // Student details collected during enrollment
    studentDetails: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      education: {
        type: String,
        required: true,
      },
      experience: {
        type: String,
        required: true,
      },
      motivation: {
        type: String,
        required: true,
      },
      goals: {
        type: String,
        required: true,
      },
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "completed", "dropped", "pending"],
      default: "active",
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedLessons: [
      {
        lessonId: String,
        completedAt: Date,
      },
    ],
    certificateIssued: {
      type: Boolean,
      default: false,
    },
    certificateIssuedAt: Date,
  },
  {
    timestamps: true,
  },
)

// Ensure a user can only enroll once per course
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true })

module.exports = mongoose.model("Enrollment", enrollmentSchema)
