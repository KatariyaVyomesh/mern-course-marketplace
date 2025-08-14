"use client"

import { useState } from "react"
import { Search } from "lucide-react"

const CourseFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    level: "All Levels",
    priceRange: "all",
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const categories = [
    "All Categories",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Backend Development",
    "Design",
    "Business",
    "Marketing",
  ]

  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "free", label: "Free" },
    { value: "under-50", label: "Under $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "over-100", label: "Over $100" },
  ]

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Level Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.level}
          onChange={(e) => handleFilterChange("level", e.target.value)}
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.priceRange}
          onChange={(e) => handleFilterChange("priceRange", e.target.value)}
        >
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CourseFilters
