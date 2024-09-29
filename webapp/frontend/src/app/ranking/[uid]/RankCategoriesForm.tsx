'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
    'Churches', 'Resort', 'Beach', 'Park', "Theater", "Museum", "Mall", "Zoo", "Restaurant", "Pub", "Local Services", "Pizza/Burger", "Hotels", "Juice Bar", "Gallery", "Dance Club", "Pool", "Gym", "Bakery", "Spa", "Cafe", "Viewpoint", "Monument", "Garden"
]

export default function RankCategoriesForm({ user }: { user: any }) {
    const [ratings, setRatings] = useState<number[]>(Array(24).fill(0))

    const handleRatingChange = (index: number, value: number) => {
        const newRatings = [...ratings]
        newRatings[index] = value
        setRatings(newRatings)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            await setDoc(doc(db, 'rankings', user.uid), {
                uid: user.uid,
                rankings: ratings,
                timestamp: new Date(),
            })

            
        } catch (error) {
            console.error('Error submitting rankings:', error)
            alert('Failed to submit rankings. Please try again.')
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Rank Categories</CardTitle>
                <CardDescription>Rate each category from 0 to 5 stars</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category, index) => (
                        <div key={category} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                            <span className="font-medium">{category}</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-6 h-6 cursor-pointer ${star <= ratings[index] ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                            }`}
                                        onClick={() => handleRatingChange(index, star)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full" onClick={handleSubmit}>Submit Rankings</Button>
            </CardFooter>
        </Card>
    )
}