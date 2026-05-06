"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/react/components/ui/card";
import { Button } from "@/react/components/ui/button";
import { Badge } from "@/react/components/ui/badge";
import {Book, Eye, Bug} from "lucide-react";

interface TaskDetailCardProps {
    imageUrl: string;
    imageAlt?: string;
    title: string;
    description: string;
    solutionsCount: number;
    viewsCount: number;
    priceType: "free" | "subscription"; // Бесплатно или По подписке
    category: "Frontend" | "Fullstack" | "Backend";
    technologies: string[];
    currentBugs: number;
}

export function TaskDetailCard({
                                   imageUrl,
                                   imageAlt = "Task preview",
                                   title,
                                   description,
                                   priceType,
                                   category,
                                   currentBugs,
                                   technologies,
                                   solutionsCount,
                                   viewsCount,
                               }: TaskDetailCardProps) {
    const priceColors = {
        free: {
            bg: "#A3E635",
            text: "#3F6212",
            label: "Бесплатно",
        },
        subscription: {
            bg: "#FBBF24",
            text: "#92400E",
            label: "По подписке",
        },
    };

    // Цвета для бейджа категории
    const categoryColors = {
        Frontend: {
            bg: "#CCFBF1",
            text: "#0F766E",
        },
        Fullstack: {
            bg: "#FFEDD5",
            text: "#EA580C",
        },
        Backend: {
            bg: "#E0E7FF",
            text: "#4338CA",
        },
    };
    const priceStyle = priceColors[priceType];
    const categoryStyle = categoryColors[category];
    return (
        <div className="grid grid-cols-2 gap-10">
            {/* Левая колонка - изображение */}
            <div className="">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="relative aspect-video h-full w-full object-cover "
                />
            </div>

            {/* Правая колонка - карточка */}
            <Card className="w-full flex flex-col h-full">

                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                            <Badge
                                variant="secondary"
                                className="text-sm px-3 py-3"
                                style={{ backgroundColor: priceStyle.bg, color: priceStyle.text }}
                            >
                                {priceStyle.label}
                            </Badge>

                            {/* Бейдж категории (справа сверху) */}
                            <Badge
                                variant="secondary"
                                className="text-sm px-3 py-3"
                                style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.text }}
                            >
                                {category}
                            </Badge>
                        </div>
                            <h1 className="text-3xl font-bold">
                                {title}
                            </h1>
                            {/* Технологии (бейджи) */}
                            <div className="flex flex-row flex-wrap gap-1">
                                {technologies.map((tech, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="bg-white text-primary-purple border border-primary-purple"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 ">
                    <div className="flex flex-col text-muted-foreground gap-6">
                        <p>
                            {description}
                        </p>
                        <div className="flex flex-row items-end text-primary-purple ">
                            <h1 className="text-primary-purple text-3xl font-bold">
                                {currentBugs}
                            </h1>
                            <Bug className="size-7 pb-1" />
                            <p className="text-muted-foreground font-bold pb-1">/10</p>
                        </div>
                    </div>

                </CardContent>

                <CardFooter className="flex flex-col gap-4 items-start">
                    <Button variant="outline"
                        className="max-w-min px-6 bg-primary-purple border border-primary-purple text-white hover:bg-white hover:text-primary-purple cursor-pointer"
                    >
                        Начать выполнение
                    </Button>

                    <div className="justify-between w-full items-end">
                        <div className="flex flex-row gap-6 text-sm text-muted-foreground w-full justify-end">
                            <div className="flex items-center gap-1">
                                <Book className="h-4 w-4" />
                                <span>{solutionsCount} решений</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{viewsCount} просмотров</span>
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}