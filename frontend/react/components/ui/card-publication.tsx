"use client";

import { Card, CardDescription, CardFooter, CardHeader } from "@/react/components/ui/card";
import { Badge } from "@/react/components/ui/badge";
import { Bug, Check } from "lucide-react";

interface TaskCardPublicationProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    priceType: "free" | "subscription";
    category: "Frontend" | "Fullstack" | "Backend";
    technologies: string[];
    currentBugs: number;
    onSelect: (taskId: string, taskTitle: string) => void;
    isSelected: boolean;
}

export function TaskCardPublication({
                                        id,
                                        title,
                                        description,
                                        imageUrl,
                                        priceType,
                                        category,
                                        technologies,
                                        currentBugs,
                                        onSelect,
                                        isSelected
                                    }: TaskCardPublicationProps) {

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
        <Card
            className={`relative mx-auto w-full max-w-sm pt-0 overflow-hidden  ${
                isSelected ? "outline-2 outline-black" : ""
            }`}
        >
            <Badge
                variant="secondary"
                className="absolute z-40 left-4 top-4 px-3 py-3"
                style={{ backgroundColor: priceStyle.bg, color: priceStyle.text }}
            >
                {priceStyle.label}
            </Badge>

            <Badge
                variant="secondary"
                className="absolute z-40 right-4 top-4 px-3 py-3"
                style={{ backgroundColor: categoryStyle.bg, color: categoryStyle.text }}
            >
                {category}
            </Badge>

            <img
                src={`http://localhost:8000${imageUrl}`}
                alt={title}
                className="relative z-20 aspect-video w-full object-cover"
            />

            <CardHeader>
                <h1 className="text-xl font-[tektur] font-medium">{title}</h1>

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

                <CardDescription className="line-clamp-3">{description}</CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-row justify-between w-full mt-auto">
                <div className="flex flex-row items-end">
                    <h1 className="text-primary-purple text-3xl font-[tektur] font-medium">
                        {currentBugs}
                    </h1>
                    <Bug className="size-7 pb-1 text-primary-purple" />
                    <p className="pb-1 font-[tektur] font-medium text-muted-foreground">/10</p>
                </div>

                <div
                    onClick={() => onSelect(id, title)}
                    className={`rounded-full p-1 border border-black cursor-pointer transition-all ${
                        isSelected
                            ? "bg-black "
                            : "bg-white text"
                    }`}
                >
                    <Check
                        className={`size-6 transition-all ${
                            isSelected
                                ? "text-white "
                                : "text-white "
                        }`}
                    />
                </div>
            </CardFooter>
        </Card>
    );
}