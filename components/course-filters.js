"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { categories, levels } from "@/lib/mock-data"

export function CourseFilters({ onFiltersChange }) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [level, setLevel] = useState("All Levels")
  const [priceRange, setPriceRange] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const handleFiltersChange = () => {
    onFiltersChange({ search, category, level, priceRange })
  }

  const clearFilters = () => {
    setSearch("")
    setCategory("All Categories")
    setLevel("All Levels")
    setPriceRange("all")
    onFiltersChange({ search: "", category: "All Categories", level: "All Levels", priceRange: "all" })
  }

  const hasActiveFilters = search || category !== "All Categories" || level !== "All Levels" || priceRange !== "all"

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search courses..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            handleFiltersChange()
          }}
          className="pl-10"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              !
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center gap-1">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value)
                handleFiltersChange()
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Level</label>
            <Select
              value={level}
              onValueChange={(value) => {
                setLevel(value)
                handleFiltersChange()
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {levels.map((lvl) => (
                  <SelectItem key={lvl} value={lvl}>
                    {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Price Range</label>
            <Select
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value)
                handleFiltersChange()
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="under-50">Under $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="over-100">Over $100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
