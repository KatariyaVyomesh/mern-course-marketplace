"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { courseAPI, enrollmentAPI } from "../services/api"
import { Star, Users, Clock, BookOpen, Play, CheckCircle } from "lucide-react"
import EnrollmentForm from "../components/EnrollmentForm"

const CourseDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [enrolled, setEnrolled] = useState(false)
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)

  const getImageSrc = (imageData) => {
    if (!imageData) {
      return "/online-learning-platform.png"
    }

    // Handle base64 images
    if (imageData.startsWith("data:image/")) {
      return imageData
    }

    // Handle absolute URLs
    if (imageData.startsWith("http://") || imageData.startsWith("https://")) {
      return imageData
    }

    // Handle relative paths (prepend API base URL if needed)
    if (imageData.startsWith("/uploads/")) {
      return `${process.env.REACT_APP_API_BASE_URL || ''}${imageData}`
    }

    // Default fallback
    return "/online-learning-platform.png"
  }

  const handleImageError = (e) => {
    if (e.target.src !== "/online-learning-platform.png") {
      e.target.src = "/online-learning-platform.png"
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [courseResponse, enrollmentResponse] = await Promise.all([
          courseAPI.getCourseById(id),
          user ? enrollmentAPI.getUserEnrollments(user.id) : Promise.resolve(null)
        ])
        
        setCourse(courseResponse.data)
        
        if (user && enrollmentResponse) {
          const isEnrolled = enrollmentResponse.data.some(
            (enrollment) => enrollment.courseId._id === id
          )
          setEnrolled(isEnrolled)
        }
      } catch (err) {
        console.error("Error loading course data:", err)
        setError(err.response?.data?.message || "Failed to load course details")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id, user])

  const handleEnrollClick = () => {
    if (!user) {
      navigate("/login", { state: { from: `/course/${id}` } })
      return
    }
    setShowEnrollmentForm(true)
  }

  const handleEnrollmentSuccess = () => {
    setShowEnrollmentForm(false)
    setEnrolled(true)
    // Optimistically update student count
    setCourse(prev => ({
      ...prev,
      studentsCount: (prev.studentsCount || 0) + 1
    }))
  }

  const handleEnrollmentCancel = () => {
    setShowEnrollmentForm(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Course Not Found</h3>
          <p className="text-gray-600 mb-4">
            {error || "The course you're looking for doesn't exist."}
          </p>
          <Link 
            to="/courses" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                  {course.category || "Uncategorized"}
                </span>
                <span className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full">
                  {course.level || "All Levels"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title || "Untitled Course"}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {course.description || "No description available"}
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">
                    {course.rating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="text-gray-300">
                    ({course.reviewsCount || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.studentsCount?.toLocaleString() || 0} students</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={course.instructor?.avatar || "/placeholder-user.jpg"}
                  alt={course.instructor?.name || "Instructor"}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-user.jpg"
                  }}
                />
                <div>
                  <p className="font-medium">
                    {course.instructorName || course.instructor?.name || "Unknown Instructor"}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {course.instructor?.bio || "No bio available"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
              <div className="aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={getImageSrc(course.image)}
                  alt={course.title || "Course image"}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">
                    ${course.price || "0"}
                  </span>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${course.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {user ? (
                enrolled ? (
                  <button 
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Enrolled
                  </button>
                ) : (
                  <button
                    onClick={handleEnrollClick}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                )
              ) : (
                <button
                  onClick={handleEnrollClick}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign In to Enroll
                </button>
              )}

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600">
                    {course.duration || "N/A"} hours
                  </p>
                </div>
                <div className="text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600">
                    {course.lessonsCount || "Multiple"} lessons
                  </p>
                </div>
                <div className="text-center">
                  <Play className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600">Video content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(course.whatYouWillLearn || []).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {(course.requirements || []).length > 0 && (
              <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(course.lessons || []).length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                <div className="space-y-3">
                  {course.lessons.map((lesson, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Play className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          {lesson.description && (
                            <p className="text-sm text-gray-600">{lesson.description}</p>
                          )}
                        </div>
                      </div>
                      {lesson.duration && (
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {lesson.duration}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h3 className="text-xl font-bold mb-4">Course Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Lifetime access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Mobile and desktop access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Downloadable resources</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showEnrollmentForm && (
        <EnrollmentForm
          course={course}
          onEnrollmentSuccess={handleEnrollmentSuccess}
          onCancel={handleEnrollmentCancel}
        />
      )}
    </div>
  )
}

export default CourseDetailPage