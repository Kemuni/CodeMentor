"use client";

import { useState } from "react";
import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/react/components/ui/breadcrumb"
import { Card, CardContent, CardFooter, CardHeader } from "@/react/components/ui/card"
import {Button} from "@/react/components/ui/button";
import {ChevronRight, Plus} from "lucide-react";
import {TaskCardPublication} from "@/react/components/ui/card-publication";
import AsteriskSmall from "@/public/AsteriskSmall.svg";
import Image from "next/image";
export default function Publication() {

    const [selectedTask, setSelectedTask] = useState<string>("");

    const [selectedTaskName, setSelectedTaskName] = useState<string>("");
    const handleSelectTask = (taskId: string, taskTitle: string) => {
        setSelectedTask( selectedTask === taskId ? "" : taskId);
        setSelectedTaskName( selectedTaskName === taskTitle ? "" : taskTitle);
    };

    return (
        <div className="flex min-h-screen flex-col bg-background-main ">
            <Header />
            <main className="flex-1">
                <div className="flex flex-col ml-8 px-40 bg-background-main pt-12 pb-30 gap-3 relative">
                    <h1 className="text-5xl font-[tektur] font-medium text-black mb-8">
                        <span className="underline decoration-wavy decoration-primary-purple underline-offset-10"> Публикация</span> решения
                    </h1>
                    <Image src={AsteriskSmall} alt="" className="w-25 h-25 absolute left-[39%] top-[1%] " />
                    <div className="flex flex-col ml-15 gap-3">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink className="text-xl text-black">
                                        Выбор задачи
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Card className="w-full">
                            <CardHeader>
                                <div className="flex flex-row justify-between w-full mt-auto">
                                    <h1 className="text-2xl font-[tektur] font-medium">Какую задачу вы решили?</h1>
                                    <Button variant="outline" className="text-primary-purple border border-primary-purple hover:bg-primary-purple hover:text-white hover:cursor-pointer">
                                        <Plus />
                                        Добавить задачу
                                    </Button>
                                </div>

                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-4 gap-3">
                                    <TaskCardPublication
                                        id="1"
                                        title="Трекер настроения"
                                        description="Создайте многостраничный сайт для трекинга настроения пользователя с хранением состояния"
                                        imageUrl="https://i.etsystatic.com/30134249/r/il/4277dd/3161817690/il_fullxfull.3161817690_j0un.jpg"
                                        priceType="subscription"
                                        category="Fullstack"
                                        technologies={["React", "FastAPI", "JS/TS", "Python", "ML"]}
                                        currentBugs={7}
                                        isSelected={selectedTask === "1"}
                                        onSelect={handleSelectTask}
                                    />
                                    <TaskCardPublication
                                        id="2"
                                        title="Блог рецептов"
                                        description="Необходимо сделать многостраничный сайт для введения блога рецептов с хранением"
                                        imageUrl="https://poleznyblog.ru/sites/default/files/poleznyblog-recepty-s-foto.jpg"
                                        priceType="free"
                                        category="Fullstack"
                                        technologies={["Vue.js", "Nest.JS", "JS/TS", "Database"]}
                                        currentBugs={3}
                                        isSelected={selectedTask === "2"}
                                        onSelect={handleSelectTask}
                                    />
                                    <TaskCardPublication
                                        id="3"
                                        title="API для парсинга песен"
                                        description="Реализуйте сервис для получения текста песен, используя различные источники для получения информации о"
                                        imageUrl="https://cdn.lifehacker.ru/wp-content/uploads/2026/02/musicfy_1770717514_scaled.jpeg"
                                        priceType="free"
                                        category="Backend"
                                        technologies={["FastAPI", "Python", "Микросервисы"]}
                                        currentBugs={3}
                                        isSelected={selectedTask === "3"}
                                        onSelect={handleSelectTask}
                                    />
                                    <TaskCardPublication
                                        id="4"
                                        title="Тест скорости печати"
                                        description="Реализуйте сайт для оценки скорости печатания пользователя, рассчитайте количество слов в минуту и точность, а также"
                                        imageUrl="https://edu-sigma.ru/wp-content/uploads/2023/05/%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.jpg"
                                        priceType="free"
                                        category="Frontend"
                                        technologies={["React", "JS/TS"]}
                                        currentBugs={2}
                                        isSelected={selectedTask === "4"}
                                        onSelect={handleSelectTask}
                                    />
                                </div>

                            </CardContent>
                            <CardFooter className="flex flex-row justify-between w-full mt-auto">
                                <div className="flex flex-col gap-2">
                                    <p>
                                        Выбрана задача:
                                        {
                                            selectedTaskName ? (
                                                <span className="underline text-primary-purple ml-1">
                                                    {selectedTaskName}
                                                </span>
                                                )
                                            : (
                                            <span className="text-gray-400 ml-1">не выбрано</span>
                                            )
                                        }
                                    </p>
                                </div>
                                <a href="/publication/review">
                                    <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white px-4" disabled={selectedTask === ""}>
                                        Далее
                                        <ChevronRight />
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </main>
            <Footer />
        </div>

    )
}