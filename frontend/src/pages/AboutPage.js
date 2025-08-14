"use client"

import { Users, BookOpen, Award, Globe, Target, Heart, Star, CheckCircle } from "lucide-react"

const AboutPage = () => {
  const stats = [
    { icon: Users, label: "Students Worldwide", value: "50,000+" },
    { icon: BookOpen, label: "Courses Available", value: "1,200+" },
    { icon: Award, label: "Expert Instructors", value: "500+" },
    { icon: Globe, label: "Countries Reached", value: "120+" },
  ]

  const features = [
    {
      icon: Target,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of real-world experience.",
    },
    {
      icon: Heart,
      title: "Personalized Learning",
      description: "Tailored learning paths that adapt to your pace and learning style.",
    },
    {
      icon: Star,
      title: "Quality Content",
      description: "High-quality video content, interactive exercises, and practical projects.",
    },
    {
      icon: CheckCircle,
      title: "Lifetime Access",
      description: "Once enrolled, access your courses anytime, anywhere, forever.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/female-ceo.png",
      bio: "Former tech executive with 15+ years in education technology.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/male-cto.png",
      bio: "Full-stack developer and former Google engineer passionate about education.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      image: "/female-content-head.png",
      bio: "Educational content specialist with expertise in curriculum development.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Our Platform</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Empowering learners worldwide with high-quality, accessible education that transforms careers and lives.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe that quality education should be accessible to everyone, everywhere. Our mission is to break
              down barriers to learning and provide world-class educational experiences that help people achieve their
              goals and unlock their potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h3>
              <p className="text-gray-600 leading-relaxed">
                We partner with industry experts and experienced educators to create comprehensive, practical courses
                that bridge the gap between theory and real-world application. Our platform offers interactive learning
                experiences designed to help you master new skills and advance your career.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
              <p className="text-gray-600 leading-relaxed">
                Our commitment to quality, accessibility, and student success sets us apart. We continuously update our
                content to reflect industry trends, provide personalized support, and create a community where learners
                can connect, collaborate, and grow together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Why Students Love Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their careers with our courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </a>
            <a
              href="/register"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors"
            >
              Sign Up Free
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
