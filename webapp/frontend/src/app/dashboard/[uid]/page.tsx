"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon, Link, MapPinIcon, PlaneIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from "next/navigation"

// Mock data for demonstration
const matches = [
    { id: 1, name: "Alex", age: 28, location: "New York", interests: ["Hiking", "Photography", "Food"] },
    { id: 10391, name: "Sam", age: 32, location: "London", interests: ["Museums", "Art", "History"] },
    { id: 3, name: "Jamie", age: 25, location: "Tokyo", interests: ["Technology", "Anime", "Sushi"] },
    { id: 4, name: "Taylor", age: 30, location: "Sydney", interests: ["Surfing", "Beach", "Wildlife"] },
    { id: 5, name: "Jordan", age: 27, location: "Paris", interests: ["Fashion", "Cuisine", "Architecture"] },
]

export default function Component() {
    const [user, setUser] = useState<any>(null);
    const params = useParams();  // Get dynamic route params
    const router = useRouter();

    const uid = params?.uid;

    const [isLoading, setLoading] = useState<any>(false);
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextMatch = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % matches.length)
    }

    const prevMatch = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + matches.length) % matches.length)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Your Travel Buddy Matches!</h1>
            <div className="flex flex-row w-full justify-center items-center">
                <Button variant={"link"}>
                    See how it works.
                </Button>
            </div>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match, index) => (
                    <MatchCard key={match.id} match={match} index={index} />
                ))}
            </div>
            <div className="md:hidden">
                <MatchCard match={matches[currentIndex]} index={currentIndex} />
                <div className="flex justify-center mt-4 space-x-4">
                    <Button onClick={prevMatch} variant="outline" size="icon">
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button onClick={nextMatch} variant="outline" size="icon">
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

function MatchCard({ match, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={`https://i.pravatar.cc/128?u=${match.id}`} alt={match.name} />
                            <AvatarFallback>{match.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-semibold">{match.name}</h2>
                            <p className="text-muted-foreground">{match.age} years old</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <MapPinIcon className="h-5 w-5 mr-2 text-primary" />
                        <span>{match.location}</span>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Interests:</h3>
                        <div className="flex flex-wrap gap-2">
                            {match.interests.map((interest) => (
                                <Badge key={interest} variant="secondary">
                                    {interest}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <Button className="w-full">
                        <PlaneIcon className="mr-2 h-4 w-4" /> Connect
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}