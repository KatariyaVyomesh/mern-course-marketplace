import { Link } from "react-router-dom"
import { Star, Users, Clock, BookOpen } from "lucide-react"

const CourseCard = ({ course }) => {
  const getImageSrc = () => {
    // If no image or empty string, return placeholder
    if (!course?.image || course.image === "") {
      return "/online-learning-platform.png"
    }

    // Handle base64 encoded images
    if (course.image.startsWith("data:image/")) {
      return course.image
    }

    // Handle absolute URLs
    if (course.image.startsWith("http://") || course.image.startsWith("https://")) {
      return course.image
    }

    // Handle relative paths (assuming your API returns paths like '/uploads/filename.jpg')
    if (course.image.startsWith("/")) {
      // Prepend your API base URL if needed (remove if images are served from the same domain)
      return `${process.env.REACT_APP_API_BASE_URL || ''}${course.image}`
    }

    // Default fallback
    return "/online-learning-platform.png"
  }

  const handleImageError = (e) => {
    // Try to fallback to different sources before using placeholder
    if (e.target.src !== "/online-learning-platform.png") {
      e.target.src = "/online-learning-platform.png"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image Section */}
      <div className="relative aspect-video">
        <img
          src={getImageSrc()}
          alt={course.title || "Course image"}
          className="w-full h-full object-cover rounded-t-lg"
          onError={handleImageError}
          loading="lazy" // Add lazy loading for better performance
        />
        <span className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded text-xs font-medium">
          {course.level || "Level not specified"}
        </span>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {/* Category */}
          <span className="inline-block px-2 py-1 text-xs border border-gray-300 rounded text-gray-600">
            {course.category || "Uncategorized"}
          </span>

          {/* Title */}
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {course.title || "Untitled Course"}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {course.description || "No description available"}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.studentsCount?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessonsCount || 0} lessons</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating?.toFixed(1) || "0.0"}</span>
              <span className="text-sm text-gray-500">({course.reviewsCount || 0})</span>
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2 text-sm">
            <img
              src={course.instructor?.avatar || "/placeholder-user.jpg"}
              alt={course.instructor?.name || "Instructor"}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder-user.jpg"
              }}
            />
            <Link
              to={`/instructor/${course.instructor?._id}`}
              className="text-gray-600 hover:text-blue-600 hover:underline"
            >
              {course.instructor?.name || "Unknown Instructor"}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${course.price || "0"}</span>
            {course.originalPrice && course.originalPrice > course.price && (
              <span className="text-sm text-gray-500 line-through">
                ${course.originalPrice}
              </span>
            )}
          </div>
          <Link
            to={`/course/${course._id}`}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            {course.price > 0 ? "Enroll Now" : "Get Started"}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard