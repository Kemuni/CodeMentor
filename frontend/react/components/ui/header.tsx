"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/react/components/ui/button";
import { Avatar, AvatarImage } from "@/react/components/ui/avatar";
import { useAuth } from "@/react/context/auth-context";
import Image from "next/image";
import Logo from "@/public/Logo.svg";

export function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    function handleLogout() {
        logout();
        router.push("/");
    }

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-background-main backdrop-blur-sm">
            <div className="grid grid-cols-3 items-center justify-between px-50 py-4">
                <a href="/">
                    <Image src={Logo} alt="" className="w-20 h-10 " />
                </a>
                <nav className="hidden gap-6 sm:flex justify-center">
                    <a href="/catalog">
                        <Button variant="ghost" className="text-lg font-medium text-primary-purple hover:text-primary-purple hover:cursor-pointer">
                            Каталог задач
                        </Button>
                    </a>
                </nav>
                <div className="flex items-center justify-end gap-3">
                    {user ? (
                        <>
                            <a href="/profile" className="flex items-center gap-2 hover:opacity-80">
                                <Avatar className="h-8 w-8">
                                    {user.avatar_url && (
                                        <AvatarImage src={user.avatar_url} alt={user.username} />
                                    )}
                                </Avatar>
                                <span className="text-sm font-medium text-primary-purple">{user.username}</span>
                            </a>
                            <Button
                                variant="outline"
                                className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer"
                                onClick={handleLogout}
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <>
                            <a href="/login">
                                <Button variant="outline" className="text-primary-purple border border-primary-purple hover:bg-primary-purple hover:text-white hover:cursor-pointer">
                                    Войти
                                </Button>
                            </a>
                            <a href="/register">
                                <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white">
                                    Регистрация
                                </Button>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
