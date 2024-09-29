"use client"
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

const RankingPage = () => {
    const [user, setUser] = useState<any>(null);
    const params = useParams();  // Get dynamic route params
    const router = useRouter();

    const uid = params?.uid;  // Access the dynamic uid

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                // User is logged in
                setUser({
                    uid: firebaseUser.uid,
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    username: firebaseUser.displayName, // Assuming displayName is used as username
                });
            } else {
                // Redirect to login if user is not authenticated
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (!user || !uid) {
        return <p>Loading...</p>;  // Show loading until both user and uid are available
    }

    return (
        <div>
            <h1>Ranking for user: {uid}</h1>
            {/* <RankCategoriesForm user={user} /> */}
        </div>
    );
};

export default RankingPage;