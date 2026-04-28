import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
import {ChallengeCard} from "@/react/components/ui/challenge-card";
import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/react/components/ui/card";
import {Button} from "@base-ui/react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/react/components/ui/input-group"
import {Bug, Funnel, Info, MoveRight, SearchIcon} from "lucide-react";
import {Badge} from "@/react/components/ui/badge";


export default function CatalogPage() {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
            <Header/>
            <main className="flex-1">
                <div className="flex flex-col items-start justify-center px-40 bg-background-main py-12 dark:bg-black gap-3">
                    <h1 className="text-5xl font-bold tracking-tight dark:text-white">
                        Каталог задач
                    </h1>
                    <div className="flex flex-row justify-between text-center w-full">
                        <div className="flex flex-col gap-3 py-6">
                            <InputGroup className="w-125">
                                <InputGroupInput placeholder="Введите тему или язык программирования" />
                                <InputGroupAddon align="inline-end">
                                    <SearchIcon/>
                                </InputGroupAddon>
                            </InputGroup>
                            <p className="flex flex-row">
                                Как правильно выбрать задачу? <Info/>
                            </p>

                        </div>
                    </div>
                    <div className="grid grid-cols-4 w-full">
                        <Card className="relative mx-auto w-full max-w-sm pt-0">
                            <Badge variant="secondary" className="absolute z-40 left-4 top-4 bg-[#A3E635] text-[#3F6212]">Бесплатно</Badge>
                            <Badge variant="secondary" className="absolute z-40 right-4 top-4 bg-[#CCFBF1] text-[#0F766E]">Frontend</Badge>
                            <img
                                src="https://edu-sigma.ru/wp-content/uploads/2023/05/%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.jpg"
                                alt="Event cover"
                                className="relative z-20 aspect-video w-full object-cover"
                            />
                            <CardHeader>

                                <CardTitle>Тест скорости печати</CardTitle>
                                <div className="flex flex-row gap-1">
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">React</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">JS/TS</Badge>
                                </div>

                                <CardDescription>
                                    Реализуйте сайт для оценки скорости печатания пользователя, рассчитайте количество слов в минуту и точность, а также
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex flex-row justify-between w-full">
                                <div className="flex flex-row items-end">
                                    <h1 className="text-primary-purple text-3xl text-bold">
                                        3
                                    </h1>
                                    <Bug className="size-7 pb-1"/>
                                    <p className="text-bold pb-1">
                                        /10
                                    </p>
                                </div>

                                <MoveRight className="text-white rounded-full size-8 px-1  bg-black "/>
                            </CardFooter>
                        </Card>
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
                                <MoveRight />
                            </CardFooter>
                        </Card>
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
            <Footer/>
        </div>
    )
}