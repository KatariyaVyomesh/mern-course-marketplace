"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { courseAPI } from "../services/api"
import { BookOpen, Users, TrendingUp } from "lucide-react"

const CategoriesPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const categories = [
    {
      name: "Web Development",
      description: "Build modern websites and web applications",
      icon: "💻",
      color: "bg-blue-500",
    },
    {
      name: "Mobile Development",
      description: "Create mobile apps for iOS and Android",
      icon: "📱",
      color: "bg-green-500",
    },
    {
      name: "Data Science",
      description: "Analyze data and build predictive models",
      icon: "📊",
      color: "bg-purple-500",
    },
    {
      name: "Machine Learning",
      description: "Build intelligent systems and AI applications",
      icon: "🤖",
      color: "bg-red-500",
    },
    {
      name: "Design",
      description: "Create beautiful and functional designs",
      icon: "🎨",
      color: "bg-pink-500",
    },
    {
      name: "Business",
      description: "Develop business and entrepreneurship skills",
      icon: "💼",
      color: "bg-yellow-500",
    },
    {
      name: "Marketing",
      description: "Master digital marketing and growth strategies",
      icon: "📈",
      color: "bg-indigo-500",
    },
    {
      name: "Photography",
      description: "Capture and edit stunning photographs",
      icon: "📸",
      color: "bg-teal-500",
    },
  ]

  useEffect(() => {
    fetchCourses()
  }, [selectedCategory])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const params = selectedCategory !== "All Categories" ? { category: selectedCategory } : {}
      const response = await courseAPI.getAllCourses(params)
      setCourses(response.data)
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryStats = (categoryName) => {
    const categoryCoursesCount = courses.filter((course) => course.category === categoryName).length
    const totalStudents = courses
      .filter((course) => course.category === categoryName)
      .reduce((sum, course) => sum + (course.studentsCount || 0), 0)
    return { coursesCount: categoryCoursesCount, studentsCount: totalStudents }
  }

  const filteredCourses =
    selectedCategory === "All Categories" ? courses : courses.filter((course) => course.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Course Categories</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Explore our comprehensive collection of courses across various disciplines and skill levels.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const stats = getCategoryStats(category.name)
              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 ${
                    selectedCategory === category.name ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div
                    className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-2xl mb-4`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{stats.coursesCount} courses</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{stats.studentsCount} students</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All Categories")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "All Categories"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "All Categories" ? "All Courses" : `${selectedCategory} Courses`}
            </h2>
            <span className="text-gray-600">{filteredCourses.length} courses found</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try selecting a different category or check back later for new courses.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Link
                  key={course._id}
                  to={`/course/${course._id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <img
                    src={course.image || "/placeholder.svg?height=200&width=300&query=course"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {course.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{course.level}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.studentsCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-blue-600">${course.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
