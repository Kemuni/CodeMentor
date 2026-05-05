import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/react/components/ui/card";
import {Badge} from "lucide-react";
import {Button} from "@base-ui/react";

export default function Overview() {
    return (
        <div className="flex min-h-screen flex-col bg-background-main dark:bg-black">
            <Header />
            <main className="flex-1">
                <div className="flex flex-col ml-8 px-40 bg-background-main py-12">
                    <h1 className="text-5xl font-bold tracking-tight  mb-10">
                        Обзор задачи
                    </h1>
                    <div className="grid grid-cols-2 gap-10">
                        <img
                            src="https://edu-sigma.ru/wp-content/uploads/2023/05/%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.jpg"
                            className="relative z-20 aspect-video object-cover"
                        />
                        <Card className="relative mx-auto w-full max-w-sm pt-0">
                            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                            <img
                                src="https://avatar.vercel.sh/shadcn1"
                                alt="Event cover"
                                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                            />
                            <CardHeader>
                                <CardTitle>Design systems meetup</CardTitle>
                                <CardDescription>
                                    A practical talk on component APIs, accessibility, and shipping
                                    faster.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full">View Event</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}