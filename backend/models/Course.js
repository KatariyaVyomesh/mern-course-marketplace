const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String, // Store instructor ID
      required: true,
    },
    instructorName: {
      type: String,
      required: true,
    },
    instructorAvatar: {
      type: String,
      default: "/instructor-teaching.png",
    },
    instructorBio: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    image: {
      type: String,
      default: "/online-learning-platform.png",
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    duration: {
      type: mongoose.Schema.Types.Mixed, // Accept both string and number
      default: 0,
    },
    lessonsCount: {
      type: Number,
      default: 1,
      min: 1,
    },
    studentsCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
    whatYouWillLearn: [
      {
        type: String,
      },
    ],
    isPopular: {
      type: Boolean,
      default: false,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    lessons: [
      {
        title: String,
        duration: String,
        videoUrl: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Course", courseSchema)
