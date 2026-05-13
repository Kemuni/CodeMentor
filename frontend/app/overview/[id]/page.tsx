"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { TaskDetailCard } from "@/react/components/ui/card-overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/react/components/ui/card";
import { Avatar, AvatarImage } from "@/react/components/ui/avatar";
import { Badge } from "@/react/components/ui/badge";
import { Button } from "@/react/components/ui/button";
import { CheckCircle2, PlayCircle, Star, Bug, Upload } from "lucide-react";
import Image from "next/image";
import AsteriskSmall from "@/public/AsteriskSmall.svg";
import {
    challengesApi,
    progressApi,
    solutionsApi,
    type ReadChallenge,
    type ReadChallengeSolution,
} from "@/lib/api";
import { useAuth } from "@/react/context/auth-context";

export default function OverviewPage() {
    const { id } = useParams<{ id: string }>();
    const challengeId = parseInt(id, 10);
    const router = useRouter();
    const { user } = useAuth();

    const [challenge, setChallenge] = useState<ReadChallenge | null>(null);
    const [solutions, setSolutions] = useState<ReadChallengeSolution[]>([]);
    const [isInProgress, setIsInProgress] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [progressLoading, setProgressLoading] = useState(false);
    const [progressError, setProgressError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const [challengeRes, solutionsRes] = await Promise.all([
                challengesApi.get(challengeId),
                solutionsApi.list(challengeId),
            ]);
            if (challengeRes.success && challengeRes.data) setChallenge(challengeRes.data);
            if (solutionsRes.success && solutionsRes.data) setSolutions(solutionsRes.data);

            if (user) {
                const progressRes = await progressApi.getMyInProgress();
                if (progressRes.success && progressRes.data) {
                    setIsInProgress(progressRes.data.some((p) => p.challenge_id === challengeId));
                }
            }
        } finally {
            setLoading(false);
        }
    }, [challengeId, user]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    async function handleToggleProgress() {
        if (!user) { router.push("/login"); return; }
        setProgressLoading(true);
        setProgressError(null);
        try {
            if (isInProgress) {
                const res = await progressApi.stopChallenge(challengeId);
                if (res.success) {
                    setIsInProgress(false);
                } else {
                    setProgressError(res.error?.message ?? "Не удалось остановить задачу");
                }
            } else {
                const res = await progressApi.startChallenge(challengeId);
                if (res.success) {
                    setIsInProgress(true);
                } else {
                    setProgressError(res.error?.message ?? "Не удалось начать задачу");
                }
            }
        } finally {
            setProgressLoading(false);
        }
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file || !user) return;
        setUploadLoading(true);
        try {
            const res = await challengesApi.uploadImage(challengeId, file);
            if (res.success && res.data) {
                setChallenge((prev) => prev ? { ...prev, image_url: res.data!.image_url } : prev);
            }
        } finally {
            setUploadLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col bg-background-main">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Загрузка...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (!challenge) {
        return (
            <div className="flex min-h-screen flex-col bg-background-main">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Задача не найдена</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-background-main dark:bg-black">
            <Header />
            <main className="flex-1">
                <div className="flex flex-col ml-8 px-40 bg-background-main pt-12 pb-30 gap-8 relative">
                    <div className="flex items-start justify-between">
                        <h1 className="text-5xl font-[tektur] font-medium text-black mb-8">
                            <span className="underline decoration-wavy decoration-primary-purple underline-offset-10">Обзор</span> задачи
                        </h1>
                        <div className="flex flex-col items-end gap-2 mt-2">
                            <div className="flex items-center gap-3">

                            <Button
                                onClick={handleToggleProgress}
                                disabled={progressLoading}
                                className={
                                    isInProgress
                                        ? "bg-green-600 hover:bg-green-700 text-white border-0"
                                        : "bg-primary-purple hover:bg-white hover:text-primary-purple border border-primary-purple"
                                }
                            >
                                {isInProgress ? (
                                    <><CheckCircle2 className="size-4 mr-1" /> В процессе</>
                                ) : (
                                    <><PlayCircle className="size-4 mr-1" /> Начать задачу</>
                                )}
                            </Button>
                            </div>
                            {progressError && (
                                <p className="text-red-500 text-sm">{progressError}</p>
                            )}
                        </div>
                    </div>
                    <Image src={AsteriskSmall} alt="" className="w-25 h-25 absolute left-[29%] top-[1%]" />
                    <TaskDetailCard
                        imageUrl={challenge.image_url}
                        title={challenge.name}
                        description={challenge.description}
                        solutionsCount={solutions.length}
                        viewsCount={0}
                        priceType={challenge.is_free ? "free" : "subscription"}
                        category={challenge.type as "Frontend" | "Backend" | "Fullstack"}
                        technologies={challenge.tags.map((t) => t.name)}
                        currentBugs={challenge.difficulty}
                    />
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>
                                <h1 className="text-3xl font-[tektur] font-medium">Техническое задание</h1>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {challenge.task_description || "*Техническое задание не добавлено*"}
                                </ReactMarkdown>
                            </div>
                        </CardContent>
                    </Card>

                    {solutions.length > 0 && (
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>
                                    <h1 className="text-3xl font-[tektur] font-medium">Решения ({solutions.length})</h1>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-6">
                                    {solutions.map((solution) => (
                                        <div key={solution.id} className="border rounded-xl p-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    {solution.user.avatar_url && (
                                                        <AvatarImage src={solution.user.avatar_url} alt={solution.user.username} />
                                                    )}
                                                </Avatar>
                                                <span className="font-medium text-primary-purple">{solution.user.username}</span>
                                                <span className="text-sm text-muted-foreground ml-auto">
                                                    {new Date(solution.created_at).toLocaleDateString("ru-RU")}
                                                </span>
                                            </div>
                                            <p className="text-sm">{solution.general_description}</p>
                                            {solution.trouble_description && (
                                                <p className="text-sm text-muted-foreground">
                                                    <span className="font-medium">Трудности:</span> {solution.trouble_description}
                                                </p>
                                            )}
                                            {solution.repo_url && (
                                                <a
                                                    href={solution.repo_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-primary-purple underline"
                                                >
                                                    Репозиторий
                                                </a>
                                            )}
                                            <div className="flex items-center gap-4 mt-1">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                                                    <span>{solution.total_rate}/10</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Bug className="size-4 text-primary-purple" />
                                                    <span>Сложность: {solution.total_difficulty}/10</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
