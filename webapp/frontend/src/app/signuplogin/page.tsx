"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Signup from "./components/signup"
import Login from "./components/login"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Page() {
    return (
        <div className="flex flex-col w-full min-h-screen items-center justify-center">
            <nav className="w-full p-4">
                <Link href="/">
                    <Button variant="ghost">
                        <ArrowLeft/>
                    </Button>
                </Link>
            </nav>
            <Tabs defaultValue="signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle></CardTitle>
                            <CardDescription>
                                Sign up for an account today.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="">
                            <Signup />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Log into your account here
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="">
                            <Login />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
