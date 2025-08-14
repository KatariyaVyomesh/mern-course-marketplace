import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star, Users, Clock, BookOpen } from "lucide-react"
import Image from "next/image"

export function CourseCard({ course }) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 right-2 bg-white text-black" variant="secondary">
            {course.level}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>

          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">{course.title}</h3>

          <p className="text-sm text-muted-foreground line-clamp-2">{course.shortDescription}</p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.studentsCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessonsCount} lessons</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-sm text-muted-foreground">({course.reviewsCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Image
              src={course.instructor.avatar || "/placeholder.svg?height=24&width=24&query=instructor"}
              alt={course.instructor.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-muted-foreground">{course.instructor.name}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${course.price}</span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
            )}
          </div>
          <Button size="sm">Enroll Now</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
