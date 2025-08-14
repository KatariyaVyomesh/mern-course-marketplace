"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { BookOpen, ShoppingCart } from "lucide-react"

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">LearnHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-gray-600 hover:text-gray-900">
              Courses
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-gray-900">
              Categories
            </Link>
            <Link to="/instructors" className="text-gray-600 hover:text-gray-900">
              Instructors
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-4 w-4" />
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                {user.role === "instructor" && (
                  <Link to="/instructor" className="text-gray-600 hover:text-gray-900">
                    Instructor
                  </Link>
                )}
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
