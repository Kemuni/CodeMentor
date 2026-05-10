"use client";

import { Card, CardDescription, CardFooter, CardHeader } from "@/react/components/ui/card";
import { Badge } from "@/react/components/ui/badge";
import { Bug, MoveRight } from "lucide-react";

// Типы для пропсов карточки
interface TaskCardProps {
    title: string;
    description: string;
    imageUrl: string;
    priceType: "free" | "subscription"; // Бесплатно или По подписке
    category: "Frontend" | "Fullstack" | "Backend";
    technologies: string[];
    currentBugs: number;
}

export function TaskCard({
                             title,
                             description,
                             imageUrl,
                             priceType,
                             category,
                             technologies,
                             currentBugs,
                         }: TaskCardProps) {
    // Цвета для бейджа цены
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
        <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
            {/* Бейдж цены (слева сверху) */}
            <Badge
                variant="secondary"
                className="absolute z-40 left-4 top-4 px-3 py-3"
                style={{ backgroundColor: priceStyle.bg, color: priceStyle.text }}
            >
                {priceStyle.label}
            </Badge>

            {/* Бейдж категории (справа сверху) */}
            <Badge
                variant="secondary"
                className="absolute z-40 right-4 top-4 px-3 py-3"
                style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.text }}
            >
                {category}
            </Badge>

            {/* Изображение */}
            <img
                src={imageUrl}
                alt={title}
                className="relative z-20 aspect-video w-full object-cover"
            />

            <CardHeader>
                <h1 className=" text-xl font-[tektur] font-medium"> {title}</h1>

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

                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-row justify-between w-full mt-auto">
                <div className="flex flex-row items-end">
                    <h1 className="text-primary-purple text-3xl font-[tektur] font-medium">
                        {currentBugs}
                    </h1>
                    <Bug className="size-7 pb-1 text-primary-purple" />
                    <p className="font-[tektur] font-medium text-muted-foreground pb-1">/10</p>
                </div>

                <MoveRight className="text-white rounded-full size-8 px-1 bg-black cursor-pointer hover:bg-black/80 transition-colors" />
            </CardFooter>
        </Card>
    );
}