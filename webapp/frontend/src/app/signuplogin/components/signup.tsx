"use client"

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const handleSignUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);
    } catch (error) {
        console.error('Error signing up:', error);
    }
};

const formSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
    username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be 20 characters or less'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be 100 characters or less'),
    email: z.string().email('Invalid email address'),
    instagram: z
        .string()
        .regex(
            /^[a-zA-Z0-9._]{1,30}$/,
            'Instagram username must be 1-30 characters and can include letters, numbers, periods, and underscores'
        )
        .optional(),
});



export default function Signup() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            email: "",
            instagram: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        handleSignUp(values.email, values.password);
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
                            <FormDescription>
                                Enter your name.
                            </FormDescription>
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
                            <FormDescription>
                                This is your private email.
                            </FormDescription>
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
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
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
                                <Input type='password' placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                                Make sure to set a secure password!
                            </FormDescription>
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
                            <FormDescription>
                                This is your public instagram.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}