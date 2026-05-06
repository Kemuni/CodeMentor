"use client";

import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/react/components/ui/breadcrumb"
import Link from "next/link";
import { Card, CardContent } from "@/react/components/ui/card"
import {Button} from "@/react/components/ui/button";


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
                                    <BreadcrumbLink className="text-xl text-muted-foreground" asChild>
                                        <Link href="/publication/review">Рецензия</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink className="text-xl text-black" >
                                        Готово
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Card className="w-full">
                            <CardContent>
                                <div className="flex flex-col items-center gap-3 my-20 ">
                                    <h1 className="text-2xl tracking-tight ">
                                        Решение задачи <span className="underline text-primary-purple">«Трекер настроения»</span> опубликовано!
                                    </h1>
                                    <p className="text-xs text-muted-foreground">Благодарим вас за использование нашего сервиса. Ваше мнение очень важно для нас!</p>
                                    <div className="flex flex-row gap-3">
                                        <a href="/catalog">
                                            <Button variant="outline" className="text-primary-purple font-bold border border-primary-purple hover:bg-primary-purple hover:text-white hover:cursor-pointer"> К задачам </Button>
                                        </a>
                                        <a href="/profile">
                                            <Button className="bg-primary-purple font-bold border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white">В профиль</Button>
                                        </a>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                </div>
            </main>
            <Footer />
        </div>

    )
}