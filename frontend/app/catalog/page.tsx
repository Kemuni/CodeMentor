import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
import {Button} from "@/react/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/react/components/ui/input-group"
import { Funnel, Info, SearchIcon} from "lucide-react";
import {TaskCard} from "@/react/components/ui/challenge-card";
import AsteriskSmall from "@/public/AsteriskSmall.svg";
import Image from "next/image";


export default function CatalogPage() {
    return (
        <div className="flex flex-col bg-background-main font-sans ">
            <Header/>
            <main className="flex-1">
                <div className="flex flex-col justify-center px-40 bg-background-main pt-12 pb-8  gap-5 relative">
                    <h1 className="text-5xl font-[tektur] font-medium text-black ">
                        <span className="underline decoration-wavy decoration-primary-purple underline-offset-10"> Каталог</span> задач
                    </h1>
                    <Image src={AsteriskSmall} alt="" className="w-25 h-25 absolute left-[28%] top-[1%] " />
                    <div className="flex flex-row justify-between text-center w-full pt-5">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex flex-row justify-between w-full items-center">
                                <InputGroup className="w-125 bg-white border border-[#636363]">
                                    <InputGroupInput placeholder="Введите тему или язык программирования" />
                                    <InputGroupAddon align="inline-end">
                                        <SearchIcon/>
                                    </InputGroupAddon>
                                </InputGroup>
                                <div className="flex flex-row gap-5 items-center ml-auto">
                                    <p className="">
                                        Сортировать по: Сначала новые
                                    </p>
                                    <Button variant="outline" className="border border-black">Фильтр <Funnel/> </Button>
                                </div>

                            </div>

                            <p className="flex items-center gap-1.5 text-gray-500">
                                Как правильно выбрать задачу? <Info className="size-4"/>
                            </p>

                        </div>
                    </div>
                    <div className="grid grid-cols-4 w-fit justify-between gap-5">
                        <TaskCard
                            title="Тест скорости печати"
                            description="Реализуйте сайт для оценки скорости печатания пользователя, рассчитайте количество слов в минуту и точность, а также"
                            imageUrl="https://edu-sigma.ru/wp-content/uploads/2023/05/%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.jpg"
                            priceType="free"
                            category="Frontend"
                            technologies={["React", "JS/TS"]}
                            currentBugs={2}
                        />
                        <TaskCard
                            title="Блог рецептов"
                            description="Необходимо сделать многостраничный сайт для введения блога рецептов с хранением"
                            imageUrl="https://poleznyblog.ru/sites/default/files/poleznyblog-recepty-s-foto.jpg"
                            priceType="free"
                            category="Fullstack"
                            technologies={["Vue.js", "Nest.JS", "JS/TS", "Database"]}
                            currentBugs={3}
                        />
                        <TaskCard
                            title="Трекер настроения"
                            description="Создайте многостраничный сайт для трекинга настроения пользователя с хранением состояния"
                            imageUrl="https://i.etsystatic.com/30134249/r/il/4277dd/3161817690/il_fullxfull.3161817690_j0un.jpg"
                            priceType="subscription"
                            category="Fullstack"
                            technologies={["React", "FastAPI", "JS/TS", "Python", "ML"]}
                            currentBugs={7}
                        />
                        <TaskCard
                            title="Тест скорости печати"
                            description="Реализуйте сайт для оценки скорости печатания пользователя, рассчитайте количество слов в минуту и точность, а также"
                            imageUrl="https://edu-sigma.ru/wp-content/uploads/2023/05/%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.jpg"
                            priceType="free"
                            category="Frontend"
                            technologies={["React", "JS/TS"]}
                            currentBugs={2}
                        />
                        <TaskCard
                            title="API для парсинга песен"
                            description="Реализуйте сервис для получения текста песен, используя различные источники для получения информации о"
                            imageUrl="https://cdn.lifehacker.ru/wp-content/uploads/2026/02/musicfy_1770717514_scaled.jpeg"
                            priceType="free"
                            category="Backend"
                            technologies={["FastAPI", "Python", "Микросервисы"]}
                            currentBugs={3}
                        />
                        <TaskCard
                            title="Трекер настроения"
                            description="Создайте многостраничный сайт для трекинга настроения пользователя с хранением состояния"
                            imageUrl="https://i.etsystatic.com/30134249/r/il/4277dd/3161817690/il_fullxfull.3161817690_j0un.jpg"
                            priceType="subscription"
                            category="Fullstack"
                            technologies={["React", "FastAPI", "JS/TS", "Python", "ML"]}
                            currentBugs={7}
                        />
                        <TaskCard
                            title="Тест скорости печати"
                            description="Реализуйте сайт для оценки скорости печатания пользователя, рассчитайте количество слов в минуту и точность, а также"
                            imageUrl="https://edu-sigma.ru/wp-content/uploads/2023/05/%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.jpg"
                            priceType="free"
                            category="Frontend"
                            technologies={["React", "JS/TS"]}
                            currentBugs={2}
                        />
                        <TaskCard
                            title="Блог рецептов"
                            description="Необходимо сделать многостраничный сайт для введения блога рецептов с хранением"
                            imageUrl="https://poleznyblog.ru/sites/default/files/poleznyblog-recepty-s-foto.jpg"
                            priceType="free"
                            category="Fullstack"
                            technologies={["Vue.js", "Nest.JS", "JS/TS", "Database"]}
                            currentBugs={3}
                        />
                    </div>
                    <div className="flex justify-center items-center pt-4">
                        <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white px-6"    >
                            Показать больше
                        </Button>
                    </div>

                </div>
            </main>
            <Footer/>
        </div>
    )
}