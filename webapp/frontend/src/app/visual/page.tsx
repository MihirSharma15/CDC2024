import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

export default function Visual() {
    return (
        <div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_40%,transparent_70%)]"></div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"></div>
            <Link className="ml-auto flex items-center ml-4 my-4 mx-4 space-x-2" href="/">
                <Plane className="h-6 w-6" />
                <span className="font-bold">HappyTrails</span>
            </Link>

            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How it Works</h2>
                            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                HappyTrails matches users by gathering input from thousands of travelers to determine how close an individual’s interests align with other users’ interests and landmark ratings. For example, a user that is very interested in seeing museums and libraries but not interested in gardens would match with other users who rate these attractions similarly.<br />
                                <br />
                                This is done by using a k-nearest neighbors (KNN) algorithm - each user’s rating values are treated as a 24 dimensional vector (one dimension for each attribute) and compared to the surrounding data. The algorithm chooses the closest vectors (users) to match with.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>



    );
}