"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { userAPI, courseAPI } from "../services/api"
import { BookOpen, Users, DollarSign, TrendingUp, Plus } from "lucide-react"

const InstructorDashboard = () => {
  const { user } = useAuth()
  const [userDetails, setUserDetails] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.role === "instructor") {
      fetchInstructorData()
    }
  }, [user])

  const fetchInstructorData = async () => {
    try {
      const [userResponse, coursesResponse] = await Promise.all([
        userAPI.getUserById(user.id),
        courseAPI.getAllCourses({ instructor: user.id }),
      ])

      setUserDetails(userResponse.data)
      setCourses(coursesResponse.data)
    } catch (error) {
      console.error("Error fetching instructor data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async (courseId, courseTitle) => {
    if (window.confirm(`Are you sure you want to delete "${courseTitle}"? This action cannot be undone.`)) {
      try {
        await courseAPI.deleteCourse(courseId)
        alert("Course deleted successfully!")
        fetchInstructorData() // Refresh the courses list
      } catch (error) {
        console.error("Error deleting course:", error)
        alert("Error deleting course. Please try again.")
      }
    }
  }

  if (!user || user.role !== "instructor") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be an instructor to access this page</p>
          <Link to="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to Dashboard
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
          <p className="mt-4 text-gray-600">Loading instructor dashboard...</p>
        </div>
      </div>
    )
  }

  const totalStudents = courses.reduce((sum, course) => sum + (course.studentsCount || 0), 0)
  const totalRevenue = courses.reduce((sum, course) => sum + course.price * (course.studentsCount || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your courses and track your success</p>
            </div>
            <Link
              to="/create-course"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Course
            </Link>
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
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.length > 0
                    ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)
                    : "0.0"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
          </div>
          <div className="p-6">
            {courses.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses created yet</h3>
                <p className="text-gray-600 mb-4">Start sharing your knowledge by creating your first course</p>
                <Link to="/create-course" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Create Your First Course
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded object-cover"
                              src={course.image || "/placeholder.svg?height=40&width=40&query=course"}
                              alt={course.title}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{course.title}</div>
                              <div className="text-sm text-gray-500">{course.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.studentsCount || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.rating} ({course.reviewsCount} reviews)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${((course.price || 0) * (course.studentsCount || 0)).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link to={`/course/${course._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                            View
                          </Link>
                          <Link
                            to={`/edit-course/${course._id}`}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteCourse(course._id, course.title)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorDashboard
