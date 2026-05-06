"use client";

import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/react/components/ui/breadcrumb"
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/react/components/ui/card"
import { Button } from "@/react/components/ui/button";
import { Star, Bug } from "lucide-react";
import { Input } from "@/react/components/ui/input";
import { Textarea } from "@/react/components/ui/textarea";
import { Counter } from "@/react/components/ui/counter";

export default function PublicationReview() {

    return (
        <div className="flex min-h-screen flex-col bg-background-main ">
            <Header />
            <main className="flex-1">
                <div className="flex flex-col ml-8 px-40 bg-background-main pt-12 pb-30 gap-3">
                    <h1 className="text-5xl font-bold tracking-tight mb-8">
                        Публикация решения
                    </h1>
                    <div className="flex flex-col ml-15 gap-3">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink className="text-xl text-muted-foreground" asChild>
                                        <Link href="/publication">Выбор задачи</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink className="text-xl text-black" >
                                        Рецензия
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Card className="w-full">
                            <CardHeader>
                                <div className="flex flex-row justify-between w-full mt-auto">
                                    <CardTitle className="text-2xl">Ответьте на пару вопросов</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg">Насколько вам понравилась задача?*</p>
                                        <Counter
                                            initialValue={0}
                                            min={0}
                                            max={10}
                                            icon={<Star className="h-7 w-7 text-primary-purple fill-current" />}
                                            label="/10"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg">Введите ссылку на публичный репозиторий:*</p>
                                        <Input placeholder="Ссылка на репозиторий с решением" className="w-150 bg-white border border-[#636363]"/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg">Опишите общее впечатление*:</p>
                                        <Textarea placeholder="Что вам было интереснее всего, почему выбрали именно эту задачу и дайте совет другим разработчикам" className="w-250 h-30 bg-white border border-[#636363]"/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg">Опишите трудности:</p>
                                        <Textarea placeholder="Определите и опишите самые сложные и трудоемкие моменты, с которыми вам довелось столкнуться" className="w-250 h-30 bg-white border border-[#636363]"/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg">Оцените сложность (изначально 7):*</p>
                                        <Counter
                                            initialValue={0}
                                            min={0}
                                            max={10}
                                            icon={<Bug className="h-7 w-7 text-primary-purple" />}
                                            label="/10"
                                        />
                                    </div>
                                </div>

                            </CardContent>
                            <CardFooter className="flex flex-row justify-between w-full mt-auto">
                                <div className="flex flex-col gap-2">
                                    <p>
                                        Выбрана задача:
                                            <span className="underline text-primary-purple ml-1">
                                                    «Трекер настроения»
                                            </span>

                                    </p>
                                </div>
                                <a href="/publication/review/result">
                                    <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white px-4">
                                        Опубликовать
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