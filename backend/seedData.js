const mongoose = require("mongoose")
const Course = require("./models/Course")
const User = require("./models/User")

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/courseplatform", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const sampleCourses = [
  {
    title: "Complete React Development Course",
    description:
      "Master React from basics to advanced concepts including hooks, context, and modern patterns. Build real-world projects and learn industry best practices.",
    instructor: {
      name: "Sarah Johnson",
      avatar: "/female-instructor-avatar.png",
      bio: "Senior Frontend Developer with 8+ years experience",
    },
    price: 89.99,
    originalPrice: 129.99,
    image: "/react-development-course.png",
    category: "Web Development",
    level: "Intermediate",
    duration: "12 hours",
    lessonsCount: 45,
    studentsCount: 2847,
    rating: 4.8,
    reviewsCount: 324,
    tags: ["React", "JavaScript", "Frontend", "Hooks"],
    isPopular: true,
    isBestseller: true,
    lessons: [
      { title: "Introduction to React", duration: "15 min", description: "Getting started with React" },
      { title: "Components and JSX", duration: "20 min", description: "Understanding React components" },
      { title: "State and Props", duration: "25 min", description: "Managing component state" },
    ],
  },
  {
    title: "Node.js Backend Development",
    description:
      "Learn to build scalable backend applications with Node.js, Express, and MongoDB. Cover authentication, APIs, and deployment.",
    instructor: {
      name: "Michael Chen",
      avatar: "/male-instructor-avatar.png",
      bio: "Full-stack developer and tech lead",
    },
    price: 79.99,
    originalPrice: 99.99,
    image: "/nodejs-backend.png",
    category: "Backend Development",
    level: "Intermediate",
    duration: "10 hours",
    lessonsCount: 38,
    studentsCount: 1923,
    rating: 4.7,
    reviewsCount: 256,
    tags: ["Node.js", "Express", "MongoDB", "API"],
    isPopular: true,
    lessons: [
      { title: "Node.js Fundamentals", duration: "18 min", description: "Understanding Node.js runtime" },
      { title: "Express Framework", duration: "22 min", description: "Building web servers with Express" },
    ],
  },
  {
    title: "Python for Data Science",
    description:
      "Comprehensive Python course covering data analysis, visualization, and machine learning fundamentals using pandas, matplotlib, and scikit-learn.",
    instructor: {
      name: "Dr. Emily Rodriguez",
      avatar: "/female-instructor-avatar.png",
      bio: "Data Scientist with PhD in Statistics",
    },
    price: 94.99,
    originalPrice: 149.99,
    image: "/python-data-science.png",
    category: "Data Science",
    level: "Beginner",
    duration: "15 hours",
    lessonsCount: 52,
    studentsCount: 3421,
    rating: 4.9,
    reviewsCount: 445,
    tags: ["Python", "Data Science", "Machine Learning", "Pandas"],
    isBestseller: true,
    lessons: [
      { title: "Python Basics", duration: "20 min", description: "Python fundamentals for data science" },
      { title: "Working with Pandas", duration: "30 min", description: "Data manipulation with pandas" },
    ],
  },
]

const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "student",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "instructor",
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  },
]

async function seedDatabase() {
  try {
    // Clear existing data
    await Course.deleteMany({})
    await User.deleteMany({})

    // Insert sample data
    await Course.insertMany(sampleCourses)
    await User.insertMany(sampleUsers)

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
