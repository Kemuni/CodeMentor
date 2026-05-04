import {Button} from "@/react/components/ui/button";

export function Footer(){
    return (
        <footer className="border-t border-zinc-200 bg-black dark:border-zinc-800 dark:bg-black">
            <div className="mx-auto max-w-7xl px-9 py-5 sm:px-6 lg:px-8">
                <div className="flex flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row">
                    <div className="flex-col">
                        <h1>КодМентор</h1>
                        <h1>Там, где идеи находят людей</h1>
                    </div>
                    <div className="flex flex-col items-start">
                        <h1 className="text-white gap-2 m-3">Ссылки</h1>

                        <Button variant="link" asChild>
                            <a href="/" className="hover:cursor-pointer text-white">
                                Главная
                            </a>
                        </Button>
                        <Button variant="link" asChild>
                            <a href="/catalog" className="hover:cursor-pointer text-white">
                                Каталог задач
                            </a>
                        </Button>
                        <Button variant="link" asChild>
                            <a href="/" className="hover:cursor-pointer text-white">
                                Топ решений
                            </a>
                        </Button>
                        <Button variant="link" asChild>
                            <a href="/" className="hover:cursor-pointer text-white">
                                Как получить портфолио
                            </a>
                        </Button>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="pb-2 text-white">Контакты</h1>
                        <div className="flex gap-1.5 flex-row ">
                            <p >Телефон:</p>
                            <p className="text-white">+7 (999) 999-99-99</p>
                        </div>
                        <div className="flex gap-1.5 flex-row">
                            <p>Email:</p>
                            <p className="text-white">support@kodmentor.ru</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}