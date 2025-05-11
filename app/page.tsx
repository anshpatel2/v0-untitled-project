"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Server,
  Shield,
  Zap,
  Clock,
  HeartPulse,
  ChevronRight,
  Globe,
  Users,
  DiscIcon as DiscordIcon,
  Gamepad2,
  Cpu,
  Wifi,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { submitContactForm } from "./actions/contact-form"
import { useToast } from "@/components/ui/use-toast"
import { useActionState } from "react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
}

const glowVariant = {
  initial: { boxShadow: "0 0 0px rgba(80, 230, 255, 0)" },
  animate: {
    boxShadow: "0 0 20px rgba(80, 230, 255, 0.7)",
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    },
  },
}

// Custom hook for animations when element is in view
function AnimateWhenVisible({ children, variants, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const { toast } = useToast()
  const [formState, formAction] = useActionState(submitContactForm, {
    message: "",
    success: false,
  })

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.3, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Particle effect for background
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.3 + 0.1,
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  // 1. First, let's add a smooth scroll function for the navbar links
  // Add this function inside the Home component, before the return statement

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#030315] text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#030315] via-[#0c0c2d] to-[#030315]"
          style={{
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
          }}
        />

        {/* Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#50e6ff] opacity-30"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 10 / particle.speed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}

        {/* Mouse follower glow */}
        <motion.div
          className="absolute rounded-full blur-[100px] opacity-20 bg-[#50e6ff]"
          style={{
            width: "40vw",
            height: "40vw",
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            transition: "left 0.5s ease-out, top 0.5s ease-out",
          }}
        />
      </div>

      {/* Grid lines */}
      <div className="fixed inset-0 -z-5 opacity-10">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KICA8cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgIDxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiM1MGU2ZmYiIHN0cm9rZS13aWR0aD0iMSIvPgogIDwvcGF0dGVybj4KPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+Cjwvc3ZnPg==')]"></div>
      </div>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 w-full border-b border-[#1a1a3a] bg-[#030315]/80 backdrop-blur-lg"
      >
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                <Server className="h-6 w-6 text-[#50e6ff]" />
              </motion.div>
              <span className="inline-block font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#50e6ff] to-[#b066ff]">
                SoleNodes
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <a
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("features")
                }}
                href="#features"
                className="text-sm font-medium transition-colors hover:text-[#50e6ff] cursor-pointer"
              >
                Features
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("pricing")
                }}
                href="#pricing"
                className="text-sm font-medium transition-colors hover:text-[#50e6ff] cursor-pointer"
              >
                Pricing
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("testimonials")
                }}
                href="#testimonials"
                className="text-sm font-medium transition-colors hover:text-[#50e6ff] cursor-pointer"
              >
                Testimonials
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("contact")
                }}
                href="#contact"
                className="text-sm font-medium transition-colors hover:text-[#50e6ff] cursor-pointer"
              >
                Contact
              </a>
              <Link
                href="https://discord.gg/Gd4FQyuNFC"
                target="_blank"
                className="text-sm font-medium transition-colors hover:text-[#50e6ff] flex items-center gap-1"
              >
                <DiscordIcon className="h-4 w-4" />
                Discord
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:text-[#50e6ff] hover:bg-[#1a1a3a]">
                <Link
                  href="https://billing.solenodes.cloud/"
                  className="w-full h-full flex items-center justify-center"
                  target="_blank"
                >
                  Login
                </Link>
              </Button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#50e6ff] to-[#b066ff] hover:from-[#b066ff] hover:to-[#50e6ff] text-white border-0"
                >
                  <Link
                    href="https://billing.solenodes.cloud/"
                    className="w-full h-full flex items-center justify-center"
                    target="_blank"
                  >
                    Get Started
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </div>
        </div>
      </motion.header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <motion.div style={{ scale, opacity, y }} className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />
          </motion.div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Badge variant="outline" className="w-fit border-[#50e6ff] text-[#50e6ff]">
                      Next-Gen Server Hosting
                    </Badge>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-[#50e6ff] to-[#b066ff]"
                  >
                    Elevate Your Gaming Experience
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="max-w-[600px] text-gray-300 md:text-xl"
                  >
                    Powerful, secure, and scalable server hosting with 99.9% uptime guarantee. Deploy your game servers
                    with confidence.
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ boxShadow: "0 0 0px rgba(80, 230, 255, 0)" }}
                    animate={{
                      boxShadow: "0 0 15px rgba(80, 230, 255, 0.5)",
                      transition: {
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    <Button
                      size="lg"
                      className="gap-1 bg-gradient-to-r from-[#50e6ff] to-[#b066ff] hover:from-[#b066ff] hover:to-[#50e6ff] text-white border-0"
                    >
                      <Link href="https://billing.solenodes.cloud/" className="flex items-center" target="_blank">
                        Get Started <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#50e6ff] text-[#50e6ff] hover:bg-[#50e6ff]/10"
                    >
                      <Link href="https://billing.solenodes.cloud/" target="_blank">
                        View Plans
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex flex-wrap items-center gap-4 text-sm"
                >
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-[#50e6ff]" />
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-[#50e6ff]" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-[#50e6ff]" />
                    <span>Free Migration</span>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#50e6ff] to-[#b066ff] rounded-lg blur-lg opacity-30"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    width={500}
                    height={500}
                    alt="Server Rack"
                    className="rounded-lg object-cover shadow-lg relative z-10 bg-[#1a1a3a]"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-[#05051d]">
          <div className="container px-4 md:px-6">
            <AnimateWhenVisible
              variants={fadeInUp}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit mx-auto border-[#50e6ff] text-[#50e6ff]">
                  Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#50e6ff] to-[#b066ff]">
                  Why Choose SoleNodes
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  We provide enterprise-grade infrastructure with features designed to keep your game servers running
                  smoothly.
                </p>
              </div>
            </AnimateWhenVisible>
            <AnimateWhenVisible
              variants={staggerContainer}
              className="mx-auto grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12"
            >
              {[
                {
                  icon: <Zap className="h-10 w-10 text-[#50e6ff] mb-2" />,
                  title: "High Performance",
                  description:
                    "SSD storage and optimized server configurations ensure your game servers run at peak performance.",
                },
                {
                  icon: <Shield className="h-10 w-10 text-[#50e6ff] mb-2" />,
                  title: "Advanced Security",
                  description: "DDoS protection, firewall, and regular security updates to keep your servers safe.",
                },
                {
                  icon: <HeartPulse className="h-10 w-10 text-[#50e6ff] mb-2" />,
                  title: "99.9% Uptime",
                  description: "Redundant infrastructure and constant monitoring ensure your services stay online.",
                },
                {
                  icon: <Clock className="h-10 w-10 text-[#50e6ff] mb-2" />,
                  title: "24/7 Support",
                  description: "Our expert team is available around the clock to assist with any issues or questions.",
                },
                {
                  icon: <Globe className="h-10 w-10 text-[#50e6ff] mb-2" />,
                  title: "Global Network",
                  description: "Multiple data centers around the world for low-latency access from anywhere.",
                },
                {
                  icon: <Gamepad2 className="h-10 w-10 text-[#50e6ff] mb-2" />,
                  title: "Game Optimized",
                  description: "Servers specifically configured for optimal gaming performance and experience.",
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={cardVariant}>
                  <motion.div
                    whileHover={{
                      y: -10,
                      boxShadow: "0 0 25px rgba(80, 230, 255, 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card className="border-[#1a1a3a] bg-[#0a0a2a]/80 backdrop-blur-sm shadow-md h-full">
                      <CardHeader className="pb-2">
                        <motion.div
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: index * 0.2,
                          }}
                        >
                          {feature.icon}
                        </motion.div>
                        <CardTitle className="text-white">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimateWhenVisible>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-[#030315]">
          <div className="container px-4 md:px-6">
            <AnimateWhenVisible
              variants={fadeInUp}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit mx-auto border-[#50e6ff] text-[#50e6ff]">
                  Pricing
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#50e6ff] to-[#b066ff]">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Choose the perfect Minecraft server plan for your needs. No hidden fees or surprises.
                </p>
              </div>
            </AnimateWhenVisible>
            <AnimateWhenVisible
              variants={staggerContainer}
              className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3"
            >
              {[
                {
                  title: "Cobblestone",
                  description: "Perfect for small Minecraft servers",
                  price: "₹250.00",
                  features: [
                    "4GB RAM",
                    "1.8 vCPU Cores",
                    "25GB SSD Storage",
                    "2 Additional Ports",
                    "4 DB Spaces",
                    "Backup - 2 Automated",
                    "24/7 Support",
                  ],
                  popular: false,
                  icon: <Server className="h-6 w-6 text-[#50e6ff]" />,
                },
                {
                  title: "Iron",
                  description: "Ideal for medium-sized communities",
                  price: "₹515.00",
                  features: [
                    "7GB RAM",
                    "2.8 vCPU Cores",
                    "42GB SSD Storage",
                    "4 Additional Ports",
                    "4 DB Spaces",
                    "Backup - 3 Automated",
                    "24/7 Support",
                  ],
                  popular: true,
                  icon: <Shield className="h-6 w-6 text-[#50e6ff]" />,
                },
                {
                  title: "Netherite",
                  description: "For large Minecraft communities",
                  price: "₹1,117.00",
                  features: [
                    "16GB RAM",
                    "4.5 vCPU Cores",
                    "96GB SSD Storage",
                    "6 Additional Ports",
                    "8 DB Spaces",
                    "Backup - 5 Automated",
                    "24/7 Support",
                  ],
                  popular: false,
                  icon: <Zap className="h-6 w-6 text-[#50e6ff]" />,
                },
              ].map((plan, index) => (
                <motion.div key={index} variants={cardVariant}>
                  <motion.div
                    whileHover={{
                      y: -10,
                      boxShadow: "0 0 30px rgba(80, 230, 255, 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card
                      className={`border-[#1a1a3a] bg-[#0a0a2a]/80 backdrop-blur-sm shadow-md relative overflow-hidden ${
                        plan.popular ? "border-[#50e6ff] shadow-[#50e6ff]/20 shadow-lg" : ""
                      }`}
                    >
                      {plan.popular && (
                        <motion.div
                          className="absolute -right-12 top-6 bg-[#50e6ff] text-[#030315] text-xs font-bold px-10 py-1 rotate-45"
                          animate={{
                            boxShadow: [
                              "0 0 10px rgba(80, 230, 255, 0.3)",
                              "0 0 20px rgba(80, 230, 255, 0.6)",
                              "0 0 10px rgba(80, 230, 255, 0.3)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          POPULAR
                        </motion.div>
                      )}
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {plan.icon}
                            <CardTitle className="text-white">{plan.title}</CardTitle>
                          </div>
                          {plan.popular && <Badge className="bg-[#50e6ff] text-[#030315] invisible">Popular</Badge>}
                        </div>
                        <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-bold text-white">
                          {plan.price}
                          <span className="text-sm font-normal text-gray-400">/month</span>
                        </div>
                        <ul className="mt-6 space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#50e6ff] flex-shrink-0" />
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                          <Button className="w-full bg-gradient-to-r from-[#50e6ff] to-[#b066ff] hover:from-[#b066ff] hover:to-[#50e6ff] text-white border-0">
                            <Link href="https://billing.solenodes.cloud/" className="w-full" target="_blank">
                              Get Started
                            </Link>
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimateWhenVisible>
            <AnimateWhenVisible variants={fadeIn} className="text-center">
              <p className="text-gray-400">
                Need a custom solution?{" "}
                <Link href="#contact" className="text-[#50e6ff] hover:underline">
                  Contact us
                </Link>{" "}
                for personalized pricing.
              </p>
            </AnimateWhenVisible>
          </div>
        </section>

        {/* Server Stats Section */}
        <section className="w-full py-12 md:py-24 bg-[#05051d] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <AnimateWhenVisible
              variants={fadeInUp}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit mx-auto border-[#50e6ff] text-[#50e6ff]">
                  Performance
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#50e6ff] to-[#b066ff]">
                  Real-Time Server Metrics
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Our servers are optimized for maximum performance and reliability.
                </p>
              </div>
            </AnimateWhenVisible>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Cpu className="h-8 w-8 text-[#50e6ff]" />,
                  title: "CPU Performance",
                  value: "99.8%",
                  description: "Average CPU utilization",
                },
                {
                  icon: <Wifi className="h-8 w-8 text-[#50e6ff]" />,
                  title: "Network Uptime",
                  value: "99.99%",
                  description: "30-day average",
                },
                {
                  icon: <Zap className="h-8 w-8 text-[#50e6ff]" />,
                  title: "Response Time",
                  value: "< 20ms",
                  description: "Average server response",
                },
              ].map((stat, index) => (
                <AnimateWhenVisible key={index} variants={cardVariant}>
                  <motion.div
                    whileHover={{
                      y: -5,
                      boxShadow: "0 0 20px rgba(80, 230, 255, 0.3)",
                    }}
                    className="bg-[#0a0a2a]/80 backdrop-blur-sm border border-[#1a1a3a] rounded-lg p-6 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#50e6ff]/5 to-[#b066ff]/5"
                      animate={{
                        opacity: [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    />
                    <div className="flex flex-col items-center text-center relative z-10">
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                        className="mb-4"
                      >
                        {stat.icon}
                      </motion.div>
                      <h3 className="text-lg font-medium text-white mb-2">{stat.title}</h3>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#50e6ff] to-[#b066ff] mb-2"
                      >
                        {stat.value}
                      </motion.div>
                      <p className="text-gray-400 text-sm">{stat.description}</p>
                    </div>
                  </motion.div>
                </AnimateWhenVisible>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-[#030315]">
          <div className="container px-4 md:px-6">
            <AnimateWhenVisible
              variants={fadeInUp}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit mx-auto border-[#50e6ff] text-[#50e6ff]">
                  Testimonials
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#50e6ff] to-[#b066ff]">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Don't just take our word for it. Here's what our customers have to say about our services.
                </p>
              </div>
            </AnimateWhenVisible>
            <AnimateWhenVisible
              variants={staggerContainer}
              className="mx-auto grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  name: "Sarah Johnson",
                  role: "Minecraft Server Owner",
                  testimonial:
                    "SoleNodes has been a game-changer for our Minecraft community. The performance is outstanding, and their support team is always there when we need them.",
                },
                {
                  name: "Michael Chen",
                  role: "Gaming Community Leader",
                  testimonial:
                    "We migrated our game servers to SoleNodes and saw immediate improvements in performance. Our players are happier, and our community has grown.",
                },
                {
                  name: "David Rodriguez",
                  role: "Game Server Admin",
                  testimonial:
                    "The uptime and performance of our servers have been flawless since switching to SoleNodes. Our players have noticed the difference.",
                },
              ].map((testimonial, index) => (
                <motion.div key={index} variants={cardVariant}>
                  <motion.div
                    whileHover={{
                      y: -5,
                      boxShadow: "0 0 20px rgba(80, 230, 255, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card className="border-[#1a1a3a] bg-[#0a0a2a]/80 backdrop-blur-sm shadow-md h-full">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#50e6ff] to-[#b066ff] flex items-center justify-center text-white font-bold text-lg">
                              {testimonial.name.charAt(0)}
                            </div>
                          </motion.div>
                          <div>
                            <CardTitle className="text-white text-lg">{testimonial.name}</CardTitle>
                            <CardDescription className="text-gray-400">{testimonial.role}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400">"{testimonial.testimonial}"</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimateWhenVisible>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-[#05051d]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <AnimateWhenVisible variants={fadeInUp} className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit border-[#50e6ff] text-[#50e6ff]">
                    Contact Us
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#50e6ff] to-[#b066ff]">
                    Get in Touch
                  </h2>
                  <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Have questions or need help choosing the right plan? Our team is here to help you find the perfect
                    hosting solution.
                  </p>
                </div>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <Users className="h-5 w-5 text-[#50e6ff]" />
                    <span className="text-gray-300">24/7 Customer Support</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-5 w-5 text-[#50e6ff]" />
                    <span className="text-gray-300">Global Data Centers</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <DiscordIcon className="h-5 w-5 text-[#50e6ff]" />
                    <Link
                      href="https://discord.gg/Gd4FQyuNFC"
                      target="_blank"
                      className="text-gray-300 hover:text-[#50e6ff]"
                    >
                      Join our Discord community
                    </Link>
                  </motion.div>
                </div>
              </AnimateWhenVisible>
              <AnimateWhenVisible
                variants={fadeIn}
                className="flex flex-col gap-4 rounded-lg border border-[#1a1a3a] bg-[#0a0a2a]/80 backdrop-blur-sm p-6 shadow-lg relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#50e6ff]/5 to-[#b066ff]/5"
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    formAction(formData)
                    // Clear form fields after submission
                    e.currentTarget.reset()
                    // Show success message
                    toast({
                      title: "Message sent!",
                      description: "We'll get back to you as soon as possible.",
                    })
                  }}
                  className="grid gap-4 relative z-10"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        First name
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        id="first-name"
                        name="first-name"
                        className="flex h-10 w-full rounded-md border border-[#1a1a3a] bg-[#030315] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#50e6ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="last-name"
                        className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Last name
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        id="last-name"
                        name="last-name"
                        className="flex h-10 w-full rounded-md border border-[#1a1a3a] bg-[#030315] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#50e6ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      id="email"
                      name="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-[#1a1a3a] bg-[#030315] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#50e6ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      id="message"
                      name="message"
                      className="flex min-h-[120px] w-full rounded-md border border-[#1a1a3a] bg-[#030315] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#50e6ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your message"
                      required
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#50e6ff] to-[#b066ff] hover:from-[#b066ff] hover:to-[#50e6ff] text-white border-0"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                  {formState?.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-md text-center ${
                        formState.success ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {formState.message}
                    </motion.div>
                  )}
                </form>
              </AnimateWhenVisible>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#030315] to-[#0c0c2d] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

          {/* Animated circuit lines */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 50 H100 M50 0 V100 M25 25 L75 75 M75 25 L25 75"
                    stroke="#50e6ff"
                    strokeWidth="0.5"
                    fill="none"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <AnimateWhenVisible
              variants={fadeInUp}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#50e6ff] to-[#b066ff]">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Join thousands of satisfied customers who trust SoleNodes for their server needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={glowVariant.initial}
                  animate={glowVariant.animate}
                >
                  <Button
                    size="lg"
                    className="gap-1 bg-gradient-to-r from-[#50e6ff] to-[#b066ff] hover:from-[#b066ff] hover:to-[#50e6ff] text-white border-0"
                  >
                    <Link href="https://billing.solenodes.cloud/" className="flex items-center" target="_blank">
                      Get Started <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-[#50e6ff] text-[#50e6ff] hover:bg-[#50e6ff]/10">
                    <Link href="https://discord.gg/Gd4FQyuNFC" target="_blank" className="flex items-center gap-2">
                      <DiscordIcon className="h-4 w-4" />
                      Join Discord
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </AnimateWhenVisible>
          </div>
        </section>
      </main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full border-t border-[#1a1a3a] bg-[#030315] py-6 md:py-12"
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Server className="h-6 w-6 text-[#50e6ff]" />
                </motion.div>
                <span className="font-bold text-white">SoleNodes</span>
              </div>
              <p className="text-sm text-gray-400">
                Reliable game server hosting solutions for players and communities.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://discord.gg/Gd4FQyuNFC"
                  target="_blank"
                  className="text-gray-400 hover:text-[#50e6ff]"
                >
                  <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400 }}>
                    <DiscordIcon className="h-5 w-5" />
                  </motion.div>
                  <span className="sr-only">Discord</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#50e6ff]">
                  <motion.svg
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </motion.svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#50e6ff]">
                  <motion.svg
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </motion.svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://billing.solenodes.cloud/"
                    target="_blank"
                    className="text-gray-400 hover:text-[#50e6ff]"
                  >
                    Minecraft Servers
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://billing.solenodes.cloud/"
                    target="_blank"
                    className="text-gray-400 hover:text-[#50e6ff]"
                  >
                    Game Servers
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://billing.solenodes.cloud/"
                    target="_blank"
                    className="text-gray-400 hover:text-[#50e6ff]"
                  >
                    VPS Hosting
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://billing.solenodes.cloud/"
                    target="_blank"
                    className="text-gray-400 hover:text-[#50e6ff]"
                  >
                    Web Hosting
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://discord.gg/Gd4FQyuNFC"
                    target="_blank"
                    className="text-gray-400 hover:text-[#50e6ff]"
                  >
                    Discord Support
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-[#50e6ff]">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://billing.solenodes.cloud/"
                    target="_blank"
                    className="text-gray-400 hover:text-[#50e6ff]"
                  >
                    Client Area
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#50e6ff]">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#50e6ff]">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#50e6ff]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#50e6ff]">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-[#1a1a3a] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} SoleNodes. All rights reserved.
            </p>
            <div className="flex space-x-4 text-xs text-gray-400">
              <Link href="#" className="hover:text-[#50e6ff]">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-[#50e6ff]">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#50e6ff]">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
