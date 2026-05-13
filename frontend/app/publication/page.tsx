"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/react/components/ui/breadcrumb";
import { Card, CardContent, CardFooter, CardHeader } from "@/react/components/ui/card";
import { Button } from "@/react/components/ui/button";
import { ChevronRight } from "lucide-react";
import { TaskCardPublication } from "@/react/components/ui/card-publication";
import AsteriskSmall from "@/public/AsteriskSmall.svg";
import Image from "next/image";
import { progressApi, type ReadUserChallengeProgress } from "@/lib/api";
import { useAuth } from "@/react/context/auth-context";

export default function Publication() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [selectedTaskId, setSelectedTaskId] = useState<string>("");
    const [selectedTaskName, setSelectedTaskName] = useState<string>("");
    const [inProgress, setInProgress] = useState<ReadUserChallengeProgress[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace("/login");
        }
    }, [authLoading, user, router]);

    const loadInProgress = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await progressApi.getMyInProgress();
            if (res.success && res.data) setInProgress(res.data);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadInProgress();
    }, [loadInProgress]);

    function handleSelectTask(taskId: string, taskTitle: string) {
        setSelectedTaskId(selectedTaskId === taskId ? "" : taskId);
        setSelectedTaskName(selectedTaskName === taskTitle ? "" : taskTitle);
    }

    function handleNext() {
        if (!selectedTaskId) return;
        router.push(`/publication/review?challenge_id=${selectedTaskId}`);
    }

    return (
        <div className="flex min-h-screen flex-col bg-background-main">
            <Header />
            <main className="flex-1">
                <div className="flex flex-col ml-8 px-40 bg-background-main pt-12 pb-30 gap-3 relative">
                    <h1 className="text-5xl font-[tektur] font-medium text-black mb-8">
                        <span className="underline decoration-wavy decoration-primary-purple underline-offset-10">Публикация</span> решения
                    </h1>
                    <Image src={AsteriskSmall} alt="" className="w-25 h-25 absolute left-[39%] top-[1%]" />
                    <div className="flex flex-col ml-15 gap-3">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink className="text-xl text-black">Выбор задачи</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Card className="w-full">
                            <CardHeader>
                                <div className="flex flex-row justify-between w-full mt-auto">
                                    <h1 className="text-2xl font-[tektur] font-medium">Какую задачу вы решили?</h1>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <p className="text-muted-foreground py-6 text-center">Загрузка задач...</p>
                                ) : inProgress.length === 0 ? (
                                    <div className="py-6 text-center flex flex-col gap-3 items-center">
                                        <p className="text-muted-foreground">У вас нет задач в процессе выполнения.</p>
                                        <a href="/catalog">
                                            <Button variant="outline" className="text-primary-purple border border-primary-purple hover:bg-primary-purple hover:text-white">
                                                Перейти в каталог
                                            </Button>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-4 gap-3">
                                        {inProgress.map((record) => {
                                            const c = record.challenge;
                                            const idStr = String(c.id);
                                            return (
                                                <TaskCardPublication
                                                    key={idStr}
                                                    id={idStr}
                                                    title={c.name}
                                                    description={c.description}
                                                    imageUrl={c.image_url}
                                                    priceType={c.is_free ? "free" : "subscription"}
                                                    category={c.type as "Frontend" | "Backend" | "Fullstack"}
                                                    technologies={c.tags.map((t) => t.name)}
                                                    currentBugs={c.difficulty}
                                                    isSelected={selectedTaskId === idStr}
                                                    onSelect={handleSelectTask}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex flex-row justify-between w-full mt-auto">
                                <div className="flex flex-col gap-2">
                                    <p>
                                        Выбрана задача:{" "}
                                        {selectedTaskName ? (
                                            <span className="underline text-primary-purple ml-1">«{selectedTaskName}»</span>
                                        ) : (
                                            <span className="text-gray-400 ml-1">не выбрано</span>
                                        )}
                                    </p>
                                </div>
                                <Button
                                    onClick={handleNext}
                                    disabled={!selectedTaskId}
                                    className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white px-4"
                                >
                                    Далее <ChevronRight />
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}