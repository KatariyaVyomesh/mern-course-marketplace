"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { courseAPI } from "../services/api"
import { useAuth } from "../contexts/AuthContext"

const CourseForm = ({ courseId = null, isEdit = false }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    level: "Beginner",
    duration: "",
    image: "",
    tags: "",
    requirements: "",
    whatYouWillLearn: "",
    instructor: user?.id || "",
    instructorName: user?.name || "",
  })

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Design",
    "Business",
    "Marketing",
    "Photography",
  ]

  const levels = ["Beginner", "Intermediate", "Advanced"]

  useEffect(() => {
    if (isEdit && courseId) {
      fetchCourse()
    }
  }, [isEdit, courseId])

  const fetchCourse = async () => {
    try {
      setLoading(true)
      const response = await courseAPI.getCourseById(courseId)
      const course = response.data
      setFormData({
        title: course.title || "",
        description: course.description || "",
        price: course.price || "",
        category: course.category || "",
        level: course.level || "Beginner",
        duration: course.duration || "",
        image: course.image || "",
        tags: Array.isArray(course.tags) ? course.tags.join(", ") : "",
        requirements: Array.isArray(course.requirements) ? course.requirements.join(", ") : "",
        whatYouWillLearn: Array.isArray(course.whatYouWillLearn) ? course.whatYouWillLearn.join(", ") : "",
        instructor: course.instructor || user?.id || "",
        instructorName: course.instructorName || user?.name || "",
      })
      if (course.image) {
        setImagePreview(course.image)
      }
    } catch (error) {
      console.error("Error fetching course:", error)
      alert("Error loading course data")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file (JPEG, PNG, GIF, or WebP)")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB")
        return
      }

      setImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageData = formData.image

      // Only convert to base64 if it's a new file upload
      if (imageFile && !imageFile.startsWith("data:image/")) {
        imageData = await convertImageToBase64(imageFile)
      }

      const courseData = {
        ...formData,
        image: imageData,
        price: Number.parseFloat(formData.price) || 0,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        requirements: formData.requirements
          .split(",")
          .map((req) => req.trim())
          .filter((req) => req),
        whatYouWillLearn: formData.whatYouWillLearn
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),
      }

      console.log("Submitting course data:", {
        ...courseData,
        image: imageData ? "base64_image_data" : "no_image"
      })

      if (isEdit && courseId) {
        await courseAPI.updateCourse(courseId, courseData)
        alert("Course updated successfully!")
      } else {
        await courseAPI.createCourse(courseData)
        alert("Course created successfully!")
      }

      navigate("/instructor-dashboard")
    } catch (error) {
      console.error("Error saving course:", error)
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to save course. Please try again."
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading course data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {isEdit ? "Edit Course" : "Create New Course"}
              </h1>
              <p className="text-gray-600 mt-2">
                {isEdit ? "Update your course information" : "Share your knowledge with students worldwide"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what students will learn in this course"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level *
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="0"
                    step="0.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Image
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-sm text-gray-500">
                    Upload an image for your course (max 5MB). Supported formats: JPG, PNG, GIF, WebP
                  </p>

                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Course preview"
                          className="w-48 h-32 object-cover rounded-md border border-gray-300"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null)
                            setImagePreview("")
                            setFormData(prev => ({ ...prev, image: "" }))
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React, JavaScript, Frontend"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements (comma-separated)
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Basic HTML knowledge, Computer with internet connection"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What You Will Learn (comma-separated)
                </label>
                <textarea
                  name="whatYouWillLearn"
                  value={formData.whatYouWillLearn}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Build React applications, Understand JavaScript ES6, Create responsive websites"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : isEdit ? "Update Course" : "Create Course"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/instructor-dashboard")}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseForm