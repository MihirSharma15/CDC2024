"use client"

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase'; // Ensure your Firebase is correctly set up
import { useRouter } from 'next/navigation';
import { doc, setDoc } from '@firebase/firestore';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
    username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be 20 characters or less'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be 100 characters or less'),
    email: z.string().email('Invalid email address'),
    instagram: z.string().regex(/^[a-zA-Z0-9._]{1,30}$/, 'Instagram username must be 1-30 characters and can include letters, numbers, periods, and underscores').optional(),
});

export default function Signup() {

    const router = useRouter();

    const handleSignUp = async (email: string, password: string, name: string, username: string, instagram: string | undefined) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user || !user.uid) {
                console.error("No valid user or user UID.");
                return;
            }

            console.log("User is authenticated:", user.uid);

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                username: username,
                instagram: instagram || null, // Optional field
                createdAt: new Date(), // Store current timestamp
            });

            console.log("User added to Firestore with UID:", user.uid);
            router.push(`/ranking/${user.uid}`);

        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            email: "",
            instagram: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        handleSignUp(values.email, values.password, values.name, values.username, values.instagram);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="janedoe@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="JaneDoeSoSilly15" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instagram Handle</FormLabel>
                            <FormControl>
                                <Input placeholder="@janedoe15" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}