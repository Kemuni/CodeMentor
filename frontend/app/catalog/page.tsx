import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/react/components/ui/card";
import {Button} from "@/react/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/react/components/ui/input-group"
import {Bug, Funnel, Info, MoveRight, SearchIcon} from "lucide-react";
import {Badge} from "@/react/components/ui/badge";


export default function CatalogPage() {
    return (
        <div className="flex min-h-screen flex-col bg-red-50 font-sans dark:bg-black">
            <Header/>
            <main className="flex-1">
                <div className="flex flex-col justify-center px-40 bg-background-main pt-12 pb-8 dark:bg-black gap-5">
                    <h1 className="text-5xl font-bold tracking-tight dark:text-white text-primary-purple">
                        Каталог задач
                    </h1>
                    <div className="flex flex-row justify-between text-center w-full pt-5">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex flex-row justify-between w-full items-center">
                                <InputGroup className="w-125 bg-white border border-[#636363]">
                                    <InputGroupInput placeholder="Введите тему или язык программирования" />
                                    <InputGroupAddon align="inline-end">
                                        <SearchIcon/>
                                    </InputGroupAddon>
                                </InputGroup>
                                <div className="flex flex-row gap-5 items-center ml-auto">
                                    <p className="">
                                        Сортировать по: Сначала новые
                                    </p>
                                    <Button variant="outline" className="border border-black">Фильтр <Funnel/> </Button>
                                </div>

                            </div>

                            <p className="flex items-center gap-1.5 text-gray-500">
                                Как правильно выбрать задачу? <Info className="size-4"/>
                            </p>

                        </div>
                    </div>
                    <div className="grid grid-cols-3 w-full justify-between gap-5">
                        <Card className="relative mx-auto w-full max-w-sm pt-0">
                            <Badge variant="secondary" className="absolute z-40 left-4 top-4 bg-[#A3E635] text-[#3F6212] px-3 py-3">Бесплатно</Badge>
                            <Badge variant="secondary" className="absolute z-40 right-4 top-4 bg-[#CCFBF1] text-[#0F766E] px-3 py-3">Frontend</Badge>
                            <img
                                src="https://edu-sigma.ru/wp-content/uploads/2023/05/%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.jpg"
                                alt="Event cover"
                                className="relative z-20 aspect-video w-full object-cover"
                            />
                            <CardHeader>

                                <CardTitle>Тест скорости печати</CardTitle>
                                <div className="flex flex-row gap-1">
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple ">React</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">JS/TS</Badge>
                                </div>

                                <CardDescription>
                                    Реализуйте сайт для оценки скорости печатания пользователя, рассчитайте количество слов в минуту и точность, а также
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex flex-row justify-between w-full mt-auto">
                                <div className="flex flex-row items-end">
                                    <h1 className="text-primary-purple text-3xl text-bold">
                                        2
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
                            <Badge variant="secondary" className="absolute z-40 left-4 top-4 bg-[#A3E635] text-[#3F6212] px-3 py-3">Бесплатно</Badge>
                            <Badge variant="secondary" className="absolute z-40 right-4 top-4 bg-[#FFEDD5] text-[#EA580C] px-3 py-3">Fullstack</Badge>
                            <img
                                src="https://poleznyblog.ru/sites/default/files/poleznyblog-recepty-s-foto.jpg"
                                alt="Event cover"
                                className="relative z-20 aspect-video w-full object-cover"
                            />
                            <CardHeader>

                                <CardTitle>Блог рецептов</CardTitle>
                                <div className="flex flex-row gap-1">
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">Vue.js</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">Nest.JS</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">JS/TS</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">Database</Badge>
                                </div>

                                <CardDescription>
                                    Необходимо сделать многостраничный сайт для введения блога рецептов с хранением
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex flex-row justify-between w-full mt-auto">
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
                            <Badge variant="secondary" className="absolute z-40 left-4 top-4 bg-[#FBBF24] text-[#92400E] px-3 py-3">По подписке</Badge>
                            <Badge variant="secondary" className="absolute z-40 right-4 top-4 bg-[#FFEDD5] text-[#EA580C] px-3 py-3">Fullstack</Badge>
                            <img
                                src="https://i.etsystatic.com/30134249/r/il/4277dd/3161817690/il_fullxfull.3161817690_j0un.jpg"
                                alt="Event cover"
                                className="relative z-20 aspect-video w-full object-cover"
                            />
                            <CardHeader>

                                <CardTitle>Трекер настроения</CardTitle>
                                <div className="flex flex-row gap-1">
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">React</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">FastAPI</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">JS/TS</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">Python</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">ML</Badge>
                                </div>

                                <CardDescription>
                                    Создайте многостраничный сайт для трекинга настроения пользователя с хранением состояния
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex flex-row justify-between w-full mt-auto">
                                <div className="flex flex-row  items-end">
                                    <h1 className="text-primary-purple text-3xl text-bold">
                                        7
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
                            <Badge variant="secondary" className="absolute z-40 left-4 top-4 bg-[#A3E635] text-[#3F6212]">Бесплатно</Badge>
                            <Badge variant="secondary" className="absolute z-40 right-4 top-4 bg-[#E0E7FF] text-[#4338CA]">Backend</Badge>
                            <img
                                src="https://cdn.lifehacker.ru/wp-content/uploads/2026/02/musicfy_1770717514_scaled.jpeg"
                                alt="Event cover"
                                className="relative z-20 aspect-video w-full object-cover"
                            />
                            <CardHeader>

                                <CardTitle>API для парсинга песен</CardTitle>
                                <div className="flex flex-row gap-1">
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">FastAPI</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">Python</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">Микросервисы</Badge>
                                </div>

                                <CardDescription>
                                    Реализуйте сервис для получения текста песен, используя различные источники для получения информации о
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
                            <Badge variant="secondary" className="absolute z-40 left-4 top-4 bg-[#FBBF24] text-[#92400E] px-3 py-3">По подписке</Badge>
                            <Badge variant="secondary" className="absolute z-40 right-4 top-4 bg-[#FFEDD5] text-[#EA580C] px-3 py-3">Fullstack</Badge>
                            <img
                                src="https://i.etsystatic.com/30134249/r/il/4277dd/3161817690/il_fullxfull.3161817690_j0un.jpg"
                                alt="Event cover"
                                className="relative z-20 aspect-video w-full object-cover"
                            />
                            <CardHeader>

                                <CardTitle>Трекер настроения</CardTitle>
                                <div className="flex flex-row gap-1">
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">React</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">FastAPI</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">JS/TS</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">Python</Badge>
                                    <Badge variant="secondary" className="bg-white text-primary-purple border border-primary-purple">ML</Badge>
                                </div>

                                <CardDescription>
                                    Создайте многостраничный сайт для трекинга настроения пользователя с хранением состояния
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex flex-row justify-between w-full mt-auto">
                                <div className="flex flex-row  items-end">
                                    <h1 className="text-primary-purple text-3xl text-bold">
                                        7
                                    </h1>
                                    <Bug className="size-7 pb-1"/>
                                    <p className="text-bold pb-1">
                                        /10
                                    </p>
                                </div>

                                <MoveRight className="text-white rounded-full size-8 px-1  bg-black "/>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="flex justify-center items-center pt-4">
                        <Button variant="outline" className="w-auto bg-primary-purple text-white hover:text-primary-purple hover:cursor-pointer">
                            Показать больше
                        </Button>
                    </div>

                </div>
            </main>
            <Footer/>
        </div>
    )
}