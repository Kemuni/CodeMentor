'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/react/components/ui/card";
import { Avatar, AvatarImage } from "@/react/components/ui/avatar";
import { Button } from "@/react/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/react/components/ui/tabs";
import { Contact, LogOut, Pencil, SquarePen } from "lucide-react";
import { Field, FieldLabel } from "@/react/components/ui/field";
import { PasswordInput } from "@/react/components/ui/password-input";
import { TaskCard } from "@/react/components/ui/challenge-card";
import AsteriskSmall from "@/public/AsteriskSmall.svg";
import Image from "next/image";
import { useAuth } from "@/react/context/auth-context";
import { progressApi, solutionsApi, type ReadUserChallengeProgress, type ReadChallengeSolution } from "@/lib/api";

export default function ProfileMain() {
    const { user, isLoading: authLoading, logout } = useAuth();
    const router = useRouter();
    const [inProgress, setInProgress] = useState<ReadUserChallengeProgress[]>([]);
    const [mySolutions, setMySolutions] = useState<ReadChallengeSolution[]>([]);

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace("/login");
        }
    }, [authLoading, user, router]);

    useEffect(() => {
        if (!user) return;
        progressApi.getMyInProgress().then((res) => {
            if (res.success && res.data) setInProgress(res.data);
        });
        solutionsApi.mySolutions().then((res) => {
            if (res.success && res.data) setMySolutions(res.data);
        });
    }, [user]);

    function handleLogout() {
        logout();
        router.push("/");
    }

    if (authLoading || !user) return null;

    return (
        <div className="flex min-h-screen flex-col bg-background-main  dark:bg-black">
            <Header />
            <main className="flex-1">
                <div className="px-40 py-12 ml-8 relative">
                    <h1 className="text-5xl font-[tektur] font-medium text-black mb-10">
                        <span className="underline decoration-wavy decoration-primary-purple underline-offset-10"> Личный</span> кабинет
                    </h1>
                    <Image src={AsteriskSmall} alt="" className="w-25 h-25 absolute left-[32%] top-[1%] " />
                    <div className="grid grid-cols-[320px_1fr] gap-10">
                        <div className="flex flex-col gap-6">
                            <Card className="w-80">
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center text-center">
                                        <Avatar className="h-50 w-50 relative">
                                            <div className="absolute z-20 bottom-0 right-0 p-2 bg-black text-white rounded-full">
                                                <Pencil />
                                            </div>
                                            <AvatarImage
                                                src={user.avatar_url ?? "https://github.com/shadcn.png"}
                                                alt={user.username}
                                                className="grayscale z-10"
                                            />
                                        </Avatar>
                                        <h3 className="mt-4 text-xl text-primary-purple font-bold">{user.username}</h3>
                                        <div className="flex items-center justify-center gap-1 text-sm text-black dark:text-white">
                                            <Contact className="w-4 h-4" />
                                            <p>{user.email ?? user.username}</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="outline"
                                        onClick={handleLogout}
                                        className="w-full gap-2 border font-bold border-red-500 text-red-500 hover:text-white hover:bg-red-500 cursor-pointer"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Выйти из профиля
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card className="w-80">
                                <CardHeader>
                                    <h1 className="text-3xl font-[Tektur] font-medium ">
                                        Статистика
                                    </h1>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-row justify-between">
                                            <p className="text-lg">Решено:</p>
                                            <p className="text-lg text-primary-purple font-bold">{mySolutions.length} задач(и)</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p className="text-lg">В процессе:</p>
                                            <p className="text-lg text-primary-purple font-bold">{inProgress.length} задач(и)</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <a href="/catalog" className="w-full">
                                        <Button variant="outline" className="w-full gap-2 text-primary-purple border border-primary-purple hover:bg-primary-purple hover:text-white hover:cursor-pointer"> К задачам </Button>
                                    </a>
                                </CardFooter>
                            </Card>
                        </div>
                        <div>
                            <Tabs defaultValue="general" className="w-full gap-6">
                                <TabsList variant="line">
                                    <TabsTrigger value="general" className="text-2xl">Общее</TabsTrigger>
                                    <TabsTrigger value="security" className="text-2xl">Безопасность</TabsTrigger>
                                    <TabsTrigger value="challenges" className="text-2xl">Мои задачи</TabsTrigger>
                                </TabsList>
                                <TabsContent value="general" className="grid grid-cols-2 gap-6 w-full">
                                    <Card>
                                        <CardHeader>
                                            <div className="flex justify-between">
                                                <h1 className="text-2xl font-[Tektur] font-medium ">Обо мне</h1>
                                                <Button variant="outline">
                                                    <SquarePen  />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-base text-muted-foreground">
                                            Опишите себя, свои умения и что вас привлекает в коде больше всего...
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <div className="flex justify-between">
                                                <h1 className="text-2xl font-[Tektur] font-medium ">Мои умения</h1>
                                                <Button variant="outline">
                                                    <SquarePen  />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-base text-muted-foreground">
                                            Тут будут отображаться ваши умения. Самое время выбрать их!
                                        </CardContent>
                                    </Card>
                                    <div className=" col-span-2">
                                        <Card>
                                            <CardHeader>
                                                <h1 className="text-2xl font-[Tektur] font-medium ">Мои решения</h1>
                                            </CardHeader>
                                            <CardContent>
                                                {mySolutions.length === 0 ? (
                                                    <div className="flex flex-col gap-3 items-center text-center text-base text-muted-foreground">
                                                        Тут будут отображаться ваши решения задач...
                                                        <a href="/catalog">
                                                            <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white max-w-min text-base font-bold px-6"> Перейти к задачам </Button>
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-3">
                                                        {mySolutions.map((s) => (
                                                            <div key={s.id} className="border rounded-xl p-4 flex flex-col gap-1">
                                                                <div className="flex items-center justify-between">
                                                                    <a href={`/overview/${s.challenge_id}`} className="font-medium text-primary-purple hover:underline">
                                                                        {s.challenge_name ?? `Задача #${s.challenge_id}`}
                                                                    </a>
                                                                    <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString("ru-RU")}</span>
                                                                </div>
                                                                <p className="text-sm">{s.general_description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                                <TabsContent value="security">
                                    <div className="flex flex-col gap-5">
                                        <Card>
                                            <CardHeader>
                                                <h1 className="text-2xl font-[Tektur] font-medium ">Сменить пароль</h1>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-col gap-3 items-start">
                                                    <Field className="max-w-lg">
                                                        <FieldLabel htmlFor="inline-end-input" className="text-lg">Введите старый пароль:</FieldLabel>
                                                        <PasswordInput placeholder="Старый пароль"/>
                                                    </Field>
                                                    <Field className="max-w-lg">
                                                        <FieldLabel htmlFor="inline-end-input" className="text-lg">Введите новый пароль:</FieldLabel>
                                                        <PasswordInput placeholder="Новый пароль"/>
                                                    </Field>
                                                    <Field className="max-w-lg">
                                                        <FieldLabel htmlFor="inline-end-input" className="text-lg">Введите новый пароль ещё раз:</FieldLabel>
                                                        <PasswordInput placeholder="Повторите новый пароль"/>
                                                    </Field>
                                                </div>
                                                <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white font-bold px-6 mt-4 text-base">
                                                    Сменить
                                                </Button>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <h1 className="text-2xl font-[Tektur] font-medium">Отвязать ключ GitHub</h1>
                                            </CardHeader>
                                            <CardContent className="text-base flex flex-col gap-3">
                                                Данная кнопка отвяжет авторизационный ключ GitHub от CodeMentor. При следующем входе в CodeMentor вам придется снова авторизовываться через GitHub.
                                                <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white font-bold px-6 max-w-sm text-base">
                                                    Отвязать ключ GitHub
                                                </Button>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-red-500/10 text-red-500">
                                            <CardHeader>
                                                <h1 className="text-2xl font-[Tektur] font-medium">Удалить аккаунт</h1>
                                            </CardHeader>
                                            <CardContent className="text-base flex flex-col gap-3 ">
                                                Нажав кнопку ниже вы НАВСЕГДА удалите свой аккаунт. Также вы удалите ВСЕ свои решения и всю информацию о себе.
                                                <span className="font-bold"> Удалив аккаунт, вы больше никогда не вернете его!</span>
                                                а ещё мы будем грустить :(
                                                <Button variant="outline" className="bg-red-500 max-w-sm text-base text-white hover:text-red-500 hover:bg-white border border-red-500 cursor-pointer font-bold px-6">
                                                    Удалить аккаунт НАВСЕГДА
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                                <TabsContent value="challenges">
                                    <div className="flex flex-col gap-5">
                                        <Card>
                                            <CardHeader>
                                                <h1 className="text-2xl font-[Tektur] font-medium">В процессе</h1>
                                            </CardHeader>
                                            <CardContent >
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {inProgress.length === 0 ? (
                                                        <p className="text-muted-foreground col-span-3">Нет задач в процессе.</p>
                                                    ) : inProgress.map((record) => {
                                                        const c = record.challenge;
                                                        return (
                                                            <TaskCard
                                                                key={c.id}
                                                                id={c.id ?? undefined}
                                                                title={c.name}
                                                                description={c.description}
                                                                imageUrl={c.image_url}
                                                                priceType={c.is_free ? "free" : "subscription"}
                                                                category={c.type as "Frontend" | "Backend" | "Fullstack"}
                                                                technologies={c.tags.map((t) => t.name)}
                                                                currentBugs={c.difficulty}
                                                                isInProgress
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <h1 className="text-2xl font-[Tektur] font-medium">Завершенные</h1>
                                            </CardHeader>
                                            <CardContent>
                                                {mySolutions.length === 0 ? (
                                                    <div className="text-base flex flex-col gap-3 text-muted-foreground items-center py-10 text-center">
                                                        Завершите задачу и прикрепите решение. Оно отобразится тут
                                                        <a href="/publication">
                                                            <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white max-w-min text-base font-bold px-6"> Добавить решение </Button>
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-3">
                                                        {mySolutions.map((s) => (
                                                            <div key={s.id} className="border rounded-xl p-4 flex flex-col gap-2">
                                                                <div className="flex items-center justify-between">
                                                                    <a href={`/overview/${s.challenge_id}`} className="font-semibold text-primary-purple hover:underline">
                                                                        {s.challenge_name ?? `Задача #${s.challenge_id}`}
                                                                    </a>
                                                                    <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString("ru-RU")}</span>
                                                                </div>
                                                                <p className="text-sm">{s.general_description}</p>
                                                                {s.trouble_description && (
                                                                    <p className="text-sm text-muted-foreground"><span className="font-medium">Трудности:</span> {s.trouble_description}</p>
                                                                )}
                                                                {s.repo_url && (
                                                                    <a href={s.repo_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-purple underline">Репозиторий</a>
                                                                )}
                                                                <div className="flex gap-4 text-sm text-muted-foreground">
                                                                    <span>Оценка: <strong className="text-black">{s.total_rate}/10</strong></span>
                                                                    <span>Сложность: <strong className="text-black">{s.total_difficulty}/10</strong></span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>

                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}