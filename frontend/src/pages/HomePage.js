"use client"

import { useState, useEffect } from "react"
import CourseCard from "../components/CourseCard"
import CourseFilters from "../components/CourseFilters"
import { TrendingUp, Users, Award, BookOpen } from "lucide-react"
import { courseAPI } from "../services/api"

const HomePage = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    level: "All Levels",
    priceRange: "all",
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [courses, filters])

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAllCourses()
      setCourses(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching courses:", error)
      setLoading(false)
    }
  }

  const filterCourses = () => {
    const filtered = courses.filter((course) => {
      // Search filter
      if (
        filters.search &&
        !course.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !course.description.toLowerCase().includes(filters.search.toLowerCase()) &&
        !course.tags?.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase()))
      ) {
        return false
      }

      // Category filter
      if (filters.category !== "All Categories" && course.category !== filters.category) {
        return false
      }

      // Level filter
      if (filters.level !== "All Levels" && course.level !== filters.level) {
        return false
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        switch (filters.priceRange) {
          case "free":
            if (course.price > 0) return false
            break
          case "under-50":
            if (course.price >= 50) return false
            break
          case "50-100":
            if (course.price < 50 || course.price > 100) return false
            break
          case "over-100":
            if (course.price <= 100) return false
            break
          default:
            break
        }
      }

      return true
    })

    setFilteredCourses(filtered)
  }

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, course) => sum + (course.studentsCount || 0), 0),
    averageRating:
      courses.length > 0
        ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)
        : "0.0",
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Learn Without Limits</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover thousands of courses from expert instructors and advance your career with practical skills
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100">
              Browse Courses
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600">
              Become an Instructor
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
              <div className="text-3xl font-bold">{stats.totalCourses}+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <div className="text-3xl font-bold">{stats.totalStudents.toLocaleString()}+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-yellow-600 mb-4" />
              <div className="text-3xl font-bold">{stats.averageRating}</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
              <div className="text-3xl font-bold">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Find Your Course</h2>
                <CourseFilters onFiltersChange={setFilters} />
              </div>
            </div>

            {/* Course Grid */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {filters.search ? `Search Results for "${filters.search}"` : "All Courses"}
                  </h2>
                  <p className="text-gray-600">
                    {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="text-xl font-bold">LearnHub</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with quality education and practical skills.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Web Development</li>
                <li>Data Science</li>
                <li>Design</li>
                <li>Business</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Community</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
