"use client"
import { motion } from "framer-motion";
import { Plane, Users, MapPin, Heart, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypeAnimation } from 'react-type-animation';
import { Globe } from "@/components/ui/globe";

export default function LandingPage() {
  return (
    <div className="relative h-full w-full bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_40%,transparent_70%)]"></div>
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <Plane className="h-6 w-6 mr-2" />
            <span className="font-bold">HappyTrails</span>
          </Link>
          <nav className="ml-auto flex items-center">
            <Link href="/visual" passHref>
              <Button variant="link">
                Learn how it works.
                </Button>
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    <TypeAnimation
                      sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Find your Next Travel Buddy',
                        2000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Find your Next Destination',
                        2000,
                        'Find your Next Partner',
                        2000,
                        'Find your Next Adventure',
                        2000
                      ]}
                      preRenderFirstString={true}
                      wrapper="span"
                      speed={10}
                      repeat={Infinity}
                    />
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Connect with like-minded travelers, plan adventures together, and explore the world with new friends on HappyTrails.
                  </p>
                </div>
                <div className="space-x-4">

                  <Link href="/signuplogin">
                    <Button variant={"default"} className="hover:scale-110 transition-all duration-200 ease-in-out">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-900">
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card 1 */}
                <Card className="py-32 h-auto bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center space-y-2">
                    <Users className="h-10 w-10 mb-2 text-indigo-600 dark:text-indigo-400" />
                    <CardTitle className="text-xl font-bold text-center">
                      Match with Travel Buddies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      Find companions who share your travel interests and preferences on HappyTrails.
                    </p>
                  </CardContent>
                </Card>
                {/* Card 2 */}
                <Card className="py-32 h-auto bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center space-y-2">
                    <MapPin className="h-10 w-10 mb-2 text-green-600 dark:text-green-400" />
                    <CardTitle className="text-xl font-bold text-center">
                      Plan Trips Together
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      Collaborate on itineraries and discover new destinations with your HappyTrails matches.
                    </p>
                  </CardContent>
                </Card>
                {/* Card 3 */}
                <Card className="py-32 h-auto bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center space-y-2">
                    <Heart className="h-10 w-10 mb-2 text-red-600 dark:text-red-400" />
                    <CardTitle className="text-xl font-bold text-center">
                      Build Lasting Friendships
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      Create meaningful connections that last beyond your travels with HappyTrails.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join HappyTrails Today</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Start your journey to finding the perfect travel companion. Sign up now and get ready for your next adventure with HappyTrails!
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                    <Button type="submit">Sign Up</Button>
                  </form>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By signing up, you agree to our <Link className="underline underline-offset-2" href="#">Terms & Conditions</Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 HappyTrails. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  )
}