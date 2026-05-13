"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/react/components/ui/breadcrumb";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/react/components/ui/card";
import { Button } from "@/react/components/ui/button";
import { Star, Bug } from "lucide-react";
import { Input } from "@/react/components/ui/input";
import { Textarea } from "@/react/components/ui/textarea";
import { Counter } from "@/react/components/ui/counter";
import Image from "next/image";
import AsteriskSmall from "@/public/AsteriskSmall.svg";
import { solutionsApi } from "@/lib/api";
import { useAuth } from "@/react/context/auth-context";

function PublicationReviewInner() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();

    const challengeId = parseInt(searchParams.get("challenge_id") ?? "0", 10);

    const [totalRate, setTotalRate] = useState(5);
    const [totalDifficulty, setTotalDifficulty] = useState(7);
    const [repoUrl, setRepoUrl] = useState("");
    const [generalDescription, setGeneralDescription] = useState("");
    const [troubleDescription, setTroubleDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace("/login");
        }
        if (!authLoading && (!challengeId || isNaN(challengeId))) {
            router.replace("/publication");
        }
    }, [authLoading, user, challengeId, router]);

    async function handleSubmit() {
        if (!generalDescription.trim() || !troubleDescription.trim()) {
            setError("Пожалуйста, заполните обязательные поля");
            return;
        }
        setError(null);
        setSubmitting(true);
        try {
            const res = await solutionsApi.create(challengeId, {
                general_description: generalDescription,
                trouble_description: troubleDescription,
                repo_url: repoUrl.trim() || null,
                total_rate: totalRate,
                total_difficulty: totalDifficulty,
            });
            if (res.success) {
                router.push("/publication/review/result");
            } else {
                setError(res.error?.message ?? "Ошибка при публикации решения");
            }
        } finally {
            setSubmitting(false);
        }
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
                                    <BreadcrumbLink className="text-xl text-muted-foreground" asChild>
                                        <Link href="/publication">Выбор задачи</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink className="text-xl text-black">Рецензия</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Card className="w-full">
                            <CardHeader>
                                <div className="flex flex-row justify-between w-full mt-auto">
                                    <h1 className="text-2xl font-[tektur] font-medium">Ответьте на пару вопросов</h1>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg">Насколько вам понравилась задача?*</p>
                                        <Counter
                                            initialValue={totalRate}
                                            min={1}
                                            max={10}
                                            icon={<Star className="h-7 w-7 text-primary-purple fill-current" />}
                                            label="/10"
                                            onChange={setTotalRate}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg">Введите ссылку на публичный репозиторий:</p>
                                        <Input
                                            placeholder="Ссылка на репозиторий с решением"
                                            className="w-150 bg-white border border-[#636363]"
                                            value={repoUrl}
                                            onChange={(e) => setRepoUrl(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg">Опишите общее впечатление*:</p>
                                        <Textarea
                                            placeholder="Что вам было интереснее всего, почему выбрали именно эту задачу и дайте совет другим разработчикам"
                                            className="w-250 h-30 bg-white border border-[#636363]"
                                            value={generalDescription}
                                            onChange={(e) => setGeneralDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg">Опишите трудности*:</p>
                                        <Textarea
                                            placeholder="Определите и опишите самые сложные и трудоёмкие моменты, с которыми вам довелось столкнуться"
                                            className="w-250 h-30 bg-white border border-[#636363]"
                                            value={troubleDescription}
                                            onChange={(e) => setTroubleDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg">Оцените сложность:*</p>
                                        <Counter
                                            initialValue={totalDifficulty}
                                            min={1}
                                            max={10}
                                            icon={<Bug className="h-7 w-7 text-primary-purple" />}
                                            label="/10"
                                            onChange={setTotalDifficulty}
                                        />
                                    </div>
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-row justify-between w-full mt-auto">
                                <div className="flex flex-col gap-2">
                                    <p>
                                        Задача:{" "}
                                        <span className="underline text-primary-purple ml-1">
                                            #{challengeId}
                                        </span>
                                    </p>
                                </div>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="text-lg bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white px-4"
                                >
                                    {submitting ? "Публикация..." : "Опубликовать"}
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

export default function PublicationReview() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p>Загрузка...</p></div>}>
            <PublicationReviewInner />
        </Suspense>
    );
}