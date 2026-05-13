"use client";

import { useState } from "react";
import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { Button } from "@/react/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/react/components/ui/card";
import Image from "next/image";
import AsteriskSmall from "@/public/AsteriskSmall.svg";
import Ricky from "@/public/Ricky.svg";
import Teewee from "@/public/Teewee.svg";
import { authApi } from "@/lib/api";

export default function Register() {
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
                <div className="flex flex-col justify-center px-40 bg-background-main pt-12 pb-8 gap-5">
                    <div className="flex flex-col items-center px-40 py-20 bg-background-main relative">
                        <Image src={AsteriskSmall} alt="" className="w-30 h-auto absolute right-1/4 top-1/30" />
                        <Image src={Ricky} alt="" className="w-50 h-auto absolute right-1/15 bottom-[10%] -rotate-20" />
                        <Image src={Teewee} alt="" className="w-50 h-50 absolute left-1/20 bottom-1/3 rotate-10" />
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <h1 className="flex text-5xl font-medium font-[Tektur] mx-auto">Регистрация</h1>
                                <p className="text-center text-muted-foreground mt-2">
                                    Регистрация происходит автоматически при первом входе через GitHub
                                </p>
                            </CardHeader>
                            <CardFooter className="flex-col gap-6 pb-8">
                                <Button
                                    onClick={handleGitHubLogin}
                                    disabled={loading}
                                    variant="outline"
                                    className="w-full bg-black text-white px-6 hover:bg-zinc-800 hover:text-white border-black"
                                >
                                    {loading ? "Перенаправление..." : "Зарегистрироваться через GitHub"}
                                </Button>
                                <span className="inline-block text-sm underline-offset-4">
                                    Уже есть аккаунт?{" "}
                                    <a className="underline text-primary-purple hover:underline" href="/login">
                                        Войти
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