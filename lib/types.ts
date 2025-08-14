export interface User {
  id: string
  email: string
  name: string
  role: "student" | "instructor" | "admin"
  avatar?: string
  createdAt: Date
}

export interface Course {
  id: string
  title: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  thumbnail: string
  instructor: {
    id: string
    name: string
    avatar?: string
    bio?: string
  }
  category: string
  level: "beginner" | "intermediate" | "advanced"
  duration: string
  lessonsCount: number
  studentsCount: number
  rating: number
  reviewsCount: number
  tags: string[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  videoUrl?: string
  duration: string
  order: number
  isPreview: boolean
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  progress: number
  completedLessons: string[]
  enrolledAt: Date
  lastAccessedAt: Date
}

export interface Review {
  id: string
  courseId: string
  userId: string
  rating: number
  comment: string
  createdAt: Date
}
