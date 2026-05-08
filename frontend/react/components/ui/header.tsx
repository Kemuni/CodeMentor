import {Button} from "@/react/components/ui/button";
import Image from "next/image";
import Logo from "@/public/Logo.svg";

export function Header(){
    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-background-main backdrop-blur-sm">
            <div className="grid grid-cols-3 items-center justify-between px-50 py-4">
                <a href="/">
                    <Image src={Logo} alt="" className="w-20 h-10 " />
                </a>
                <nav className="hidden gap-6 sm:flex justify-center">
                    <a href="/catalog">
                        <Button variant="ghost" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer">
                            Каталог задач
                        </Button>
                    </a>
                    <a href="/catalog">
                        <Button variant="ghost" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer">
                            Топ решений
                        </Button>
                    </a>
                    <a href="/catalog">
                        <Button variant="ghost" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer">
                            Направления
                        </Button>
                    </a>
                </nav>
                <div className="flex items-center justify-end gap-3">
                    <a href="/login">
                        <Button variant="outline" className="text-primary-purple border border-primary-purple hover:bg-primary-purple hover:text-white hover:cursor-pointer"> Войти </Button>
                    </a>
                    <a href="/register">
                        <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white">Регистрация</Button>
                    </a>

                </div>
            </div>
        </header>
    )
}