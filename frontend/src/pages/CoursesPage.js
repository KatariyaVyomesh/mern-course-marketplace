"use client"

import { useState, useEffect } from "react"
import { courseAPI } from "../services/api"
import CourseCard from "../components/CourseCard"
import CourseFilters from "../components/CourseFilters"
import { BookOpen } from "lucide-react"

const CoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
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
      setLoading(true)
      const response = await courseAPI.getAllCourses()
      setCourses(response.data)
      setError("")
    } catch (err) {
      setError("Failed to fetch courses. Please try again later.")
      console.error("Error fetching courses:", err)
    } finally {
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Error Loading Courses</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchCourses} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
          <p className="text-gray-600 mt-2">Discover and learn new skills with our comprehensive course catalog</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filter Courses</h2>
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
    </div>
  )
}

export default CoursesPage
