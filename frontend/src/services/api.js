import axios from "axios"

const API_BASE_URL = "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Course API
export const courseAPI = {
  getAllCourses: (params = {}) => api.get("/courses", { params }),
  getCourseById: (id) => api.get(`/courses/${id}`),
  createCourse: (courseData) => api.post("/courses", courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
}

// User API
export const userAPI = {
  getAllUsers: () => api.get("/users"),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  enrollInCourse: (userId, courseId) => api.post(`/users/${userId}/enroll/${courseId}`),
}

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getProfile: () => api.get("/auth/profile"),
}

// Enrollment API
export const enrollmentAPI = {
  createEnrollment: (enrollmentData) => api.post("/enrollments", enrollmentData),
  getUserEnrollments: (userId) => api.get(`/enrollments/user/${userId}`),
  getCourseEnrollments: (courseId) => api.get(`/enrollments/course/${courseId}`),
  getEnrollmentById: (id) => api.get(`/enrollments/${id}`),
  updateEnrollmentProgress: (id, progressData) => api.put(`/enrollments/${id}/progress`, progressData),
  deleteEnrollment: (id) => api.delete(`/enrollments/${id}`),
}

export default api
