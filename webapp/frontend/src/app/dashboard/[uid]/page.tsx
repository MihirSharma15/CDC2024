"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon, PlaneIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from "next/navigation"

// Interest dictionary where the numbers in the array map to the categories you provided
const interestDictionary: { [key: number]: string } = {
    0: 'Churches',
    1: 'Resort',
    2: 'Beach',
    3: 'Park',
    4: 'Theater',
    5: 'Museum',
    6: 'Mall',
    7: 'Zoo',
    8: 'Restaurant',
    9: 'Pub',
    10: 'Local Services',
    11: 'Pizza/Burger',
    12: 'Hotels',
    13: 'Juice Bar',
    14: 'Gallery',
    15: 'Dance Club',
    16: 'Pool',
    17: 'Gym',
    18: 'Bakery',
    19: 'Spa',
    20: 'Cafe',
    21: 'Viewpoint',
    22: 'Monument',
    23: 'Garden',
};

// List of random cities around the world
const randomCities = [
    'New York, USA', 'London, UK', 'Tokyo, Japan', 'Paris, France', 'Sydney, Australia',
    'Berlin, Germany', 'Toronto, Canada', 'Cape Town, South Africa', 'Mumbai, India',
    'Rio de Janeiro, Brazil', 'Dubai, UAE', 'Bangkok, Thailand', 'Istanbul, Turkey',
    'Moscow, Russia', 'Rome, Italy', 'Mexico City, Mexico', 'Cairo, Egypt', 'Seoul, South Korea',
    'Madrid, Spain', 'Buenos Aires, Argentina', 'Athens, Greece', 'Lisbon, Portugal'
];

// Helper function to get a random city
function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * randomCities.length);
    return randomCities[randomIndex];
}

export default function Component() {
    const [matches, setMatches] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const params = useParams();  // Get dynamic route params
    const router = useRouter();

    const uid = params?.uid;

    // Fetch data function to get data from the local API
    async function fetchData(uid: string): Promise<any[]> {
        try {
            const response = await fetch(`http://127.0.0.1:8000/${uid}`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: any = await response.json();
            return data;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    useEffect(() => {
        if (uid) {
            fetchData(uid).then(jsonData => {
                // Process the JSON data to match the format required
                const processedMatches = jsonData.map((matchArray: any[]) => {
                    const [id, name, interestKey1, interestKey2] = matchArray;
                    return {
                        id,
                        name,
                        age: Math.floor(Math.random() * 20) + 20, // Set random age between 20 and 40
                        location: getRandomCity(), // Select random city for location
                        interests: [
                            interestDictionary[interestKey1],  // Map the interest keys to dictionary values
                            interestDictionary[interestKey2]
                        ],
                    };
                });
                setMatches(processedMatches);
            });
        }
    }, [uid]);

    const nextMatch = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % matches.length);
    }

    const prevMatch = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + matches.length) % matches.length);
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
                {matches.length > 0 && (
                    <MatchCard match={matches[currentIndex]} index={currentIndex} />
                )}
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

function MatchCard({ match, index }: { match: any, index: number }) {
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
                            {match.interests.map((interest: string) => (
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