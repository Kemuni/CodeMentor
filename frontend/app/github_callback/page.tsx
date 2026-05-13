"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuth } from "@/react/context/auth-context";

function GithubCallbackInner() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { login } = useAuth();
    const called = useRef(false);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        const code = searchParams.get("code");
        if (!code) {
            router.replace("/login");
            return;
        }

        authApi
            .githubCallback(code)
            .then((token) => login(token))
            .then(() => router.replace("/catalog"))
            .catch(() => router.replace("/login"));
    }, [searchParams, router, login]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background-main">
            <p className="text-lg text-muted-foreground">Авторизация через GitHub...</p>
        </div>
    );
}

export default function GithubCallbackPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-background-main">
                <p className="text-lg text-muted-foreground">Загрузка...</p>
            </div>
        }>
            <GithubCallbackInner />
        </Suspense>
    );
}
