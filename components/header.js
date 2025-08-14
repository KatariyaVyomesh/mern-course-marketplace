import { Button } from "@/components/ui/button"
import { BookOpen, ShoppingCart } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">LearnHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="text-muted-foreground hover:text-foreground">
              Courses
            </Link>
            <Link href="/categories" className="text-muted-foreground hover:text-foreground">
              Categories
            </Link>
            <Link href="/instructors" className="text-muted-foreground hover:text-foreground">
              Instructors
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
