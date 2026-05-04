import {Button} from "@/react/components/ui/button";

export function Header(){
    return (
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-background-main backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
            <div className="grid grid-cols-3 items-center justify-between px-50 py-4">
                <div className="text-xl font-bold text-black dark:text-white">КодМентор</div>
                <nav className="hidden gap-6 sm:flex justify-center">
                    <Button variant="ghost" asChild>
                        <a href="/catalog" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer">
                            Каталог задач
                        </a>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="/catalog" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer">
                            Топ решений
                        </a>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="/catalog" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer">
                            Направления
                        </a>
                    </Button>
                </nav>
                <div className="flex items-center justify-end gap-3">
                    <Button variant="outline" asChild>
                        <a href="/login" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer">
                            Войти
                        </a>
                    </Button>
                    <Button>
                        <a href="/register" className="hover:cursor-pointer">
                            Регистрация
                        </a>
                    </Button>
                </div>
            </div>
        </header>
    )
}