"use client"

import { useParams } from "react-router-dom"
import CourseForm from "../components/CourseForm"

const EditCoursePage = () => {
  const { id } = useParams()

  return <CourseForm courseId={id} isEdit={true} />
}

export default EditCoursePage
