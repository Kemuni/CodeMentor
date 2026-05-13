"use client";

import { useState } from "react";
import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { Button } from "@/react/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/react/components/ui/card";
import AsteriskSmall from "@/public/AsteriskSmall.svg";
import Image from "next/image";
import Ricky from "@/public/Ricky.svg";
import Teewee from "@/public/Teewee.svg";
import { authApi } from "@/lib/api";

export default function Login() {
    const [loading, setLoading] = useState(false);

    async function handleGitHubLogin() {
        setLoading(true);
        try {
            const url = await authApi.getGithubLoginUrl();
            window.location.href = url;
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col font-sans dark:bg-black">
            <Header />
            <main className="flex-1 bg-background-main">
                <div className="flex flex-col justify-center px-40 bg-background-main pt-12 pb-8 dark:bg-black gap-5">
                    <div className="flex flex-col items-center px-40 py-20 bg-background-main relative">
                        <Image src={AsteriskSmall} alt="" className="w-30 h-auto absolute right-1/4 top-1/30" />
                        <Image src={Ricky} alt="" className="w-50 h-auto absolute right-1/15 bottom-[10%] -rotate-20" />
                        <Image src={Teewee} alt="" className="w-50 h-50 absolute left-1/20 bottom-1/3 rotate-10" />
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <h1 className="flex text-5xl mx-auto font-medium font-[Tektur]">Авторизация</h1>
                                <p className="text-center text-muted-foreground mt-2">
                                    Войдите через аккаунт GitHub, чтобы продолжить
                                </p>
                            </CardHeader>
                            <CardFooter className="flex-col gap-6 pb-8">
                                <Button
                                    onClick={handleGitHubLogin}
                                    disabled={loading}
                                    variant="outline"
                                    className="w-full bg-black text-white px-6 hover:bg-zinc-800 hover:text-white border-black"
                                >
                                    {loading ? "Перенаправление..." : "Войти с помощью GitHub"}
                                </Button>
                                <span className="inline-block text-sm underline-offset-4">
                                    Нет аккаунта?{" "}
                                    <a className="underline text-primary-purple hover:underline" href="/register">
                                        Зарегистрироваться
                                    </a>
                                </span>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}