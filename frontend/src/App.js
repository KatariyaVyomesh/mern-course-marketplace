import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import CoursesPage from "./pages/CoursesPage"
import CourseDetailPage from "./pages/CourseDetailPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import InstructorDashboard from "./pages/InstructorDashboard"
import AboutPage from "./pages/AboutPage"
import CategoriesPage from "./pages/CategoriesPage"
import CreateCoursePage from "./pages/CreateCoursePage"
import EditCoursePage from "./pages/EditCoursePage"
import InstructorProfilePage from "./pages/InstructorProfilePage"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/instructors" element={<InstructorDashboard />} />
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/create-course" element={<CreateCoursePage />} />
            <Route path="/edit-course/:id" element={<EditCoursePage />} />
            <Route path="/instructor/:id" element={<InstructorProfilePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
