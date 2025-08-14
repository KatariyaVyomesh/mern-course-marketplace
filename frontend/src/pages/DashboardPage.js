"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { enrollmentAPI } from "../services/api"
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react"

const DashboardPage = () => {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserEnrollments()
    }
  }, [user])

  const fetchUserEnrollments = async () => {
    try {
      const response = await enrollmentAPI.getUserEnrollments(user.id)
      setEnrollments(response.data)
    } catch (error) {
      console.error("Error fetching enrollments:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to access your dashboard</h2>
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mt-2">Continue your learning journey</p>
            </div>
            {user.role === "instructor" && (
              <Link to="/instructor" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Instructor Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Progress</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
          </div>
          <div className="p-6">
            {enrollments.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
                <p className="text-gray-600 mb-4">Start learning by enrolling in your first course</p>
                <Link to="/courses" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment) => (
                  <div key={enrollment._id} className="border rounded-lg p-4">
                    <img
                      src={enrollment.courseId.image || "/placeholder.svg?height=150&width=250&query=course"}
                      alt={enrollment.courseId.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold mb-2">{enrollment.courseId.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>Progress: {enrollment.progress || 0}%</span>
                      <span>Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${enrollment.progress || 0}%` }}
                      ></div>
                    </div>
                    <Link
                      to={`/course/${enrollment.courseId._id}`}
                      className="block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Continue Learning
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
