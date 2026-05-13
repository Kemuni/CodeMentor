"use client";

import { useEffect, useState, useCallback } from "react";
import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { Button } from "@/react/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/react/components/ui/input-group";
import { Funnel, Info, SearchIcon } from "lucide-react";
import { TaskCard } from "@/react/components/ui/challenge-card";
import AsteriskSmall from "@/public/AsteriskSmall.svg";
import Image from "next/image";
import { challengesApi, progressApi, type ReadChallenge } from "@/lib/api";
import { useAuth } from "@/react/context/auth-context";

export default function CatalogPage() {
    const { user } = useAuth();
    const [challenges, setChallenges] = useState<ReadChallenge[]>([]);
    const [inProgressIds, setInProgressIds] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await challengesApi.list();
            if (res.success && res.data) setChallenges(res.data);

            if (user) {
                const progressRes = await progressApi.getMyInProgress();
                if (progressRes.success && progressRes.data) {
                    setInProgressIds(new Set(progressRes.data.map((p) => p.challenge_id)));
                }
            }
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    async function handleStart(id: number) {
        const res = await progressApi.startChallenge(id);
        if (res.success) {
            setInProgressIds((prev) => new Set([...prev, id]));
        }
    }

    const filtered = challenges.filter((c) =>
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="flex flex-col bg-background-main font-sans">
            <Header />
            <main className="flex-1">
                <div className="flex flex-col justify-center px-40 bg-background-main pt-12 pb-8 gap-5 relative">
                    <h1 className="text-5xl font-[tektur] font-medium text-black">
                        <span className="underline decoration-wavy decoration-primary-purple underline-offset-10">Каталог</span> задач
                    </h1>
                    <Image src={AsteriskSmall} alt="" className="w-25 h-25 absolute left-[28%] top-[1%]" />
                    <div className="flex flex-row justify-between text-center w-full pt-5">
                        {/*<div className="flex flex-col gap-3 w-full">*/}
                        {/*    <div className="flex flex-row justify-between w-full items-center">*/}
                        {/*        <InputGroup className="w-125 bg-white border border-[#636363]">*/}
                        {/*            <InputGroupInput*/}
                        {/*                placeholder="Введите тему или язык программирования"*/}
                        {/*                value={search}*/}
                        {/*                onChange={(e) => setSearch(e.target.value)}*/}
                        {/*            />*/}
                        {/*            <InputGroupAddon align="inline-end">*/}
                        {/*                <SearchIcon />*/}
                        {/*            </InputGroupAddon>*/}
                        {/*        </InputGroup>*/}
                        {/*        <div className="flex flex-row gap-5 items-center ml-auto">*/}
                        {/*            <p>Сортировать по: Сначала новые</p>*/}
                        {/*            <Button variant="outline" className="border border-black">Фильтр <Funnel /></Button>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <p className="flex items-center gap-1.5 text-gray-500">*/}
                        {/*        Как правильно выбрать задачу? <Info className="size-4" />*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                    </div>

                    {loading ? (
                        <p className="text-muted-foreground py-10 text-center">Загрузка задач...</p>
                    ) : filtered.length === 0 ? (
                        <p className="text-muted-foreground py-10 text-center">Задачи не найдены</p>
                    ) : (
                        <div className="grid grid-cols-4 w-fit justify-between gap-5">
                            {filtered.map((challenge) => (
                                <TaskCard
                                    key={challenge.id ?? challenge.name}
                                    id={challenge.id ?? undefined}
                                    title={challenge.name}
                                    description={challenge.description}
                                    imageUrl={challenge.image_url}
                                    priceType={challenge.is_free ? "free" : "subscription"}
                                    category={challenge.type as "Frontend" | "Backend" | "Fullstack"}
                                    technologies={challenge.tags.map((t) => t.name)}
                                    currentBugs={challenge.difficulty}
                                    isInProgress={challenge.id != null && inProgressIds.has(challenge.id)}
                                    isLoggedIn={!!user}
                                    onStart={handleStart}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}