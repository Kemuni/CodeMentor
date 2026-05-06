'use client';

import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/react/components/ui/card";
import { Avatar, AvatarImage } from "@/react/components/ui/avatar";
import { Button } from "@/react/components/ui/button";
import { Field, FieldLabel } from "@/react/components/ui/field"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/react/components/ui/tabs";
import {Contact, LogOut, Pencil, SquarePen} from "lucide-react";
import {PasswordInput} from "@/react/components/ui/password-input";
import {TaskCard} from "@/react/components/ui/challenge-card";


export default function ProfileMain() {
    return (
        <div className="flex min-h-screen flex-col bg-background-main  dark:bg-black">
            <Header />
            <main className="flex-1">
                <div className="px-40 py-12 ml-8">
                    <h1 className="text-5xl font-bold tracking-tight dark:text-white mb-10">
                        Личный кабинет
                    </h1>
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
                                                src="https://github.com/shadcn.png"
                                                alt="@shadcn"
                                                className="grayscale z-10"
                                            />
                                        </Avatar>
                                        <h3 className="mt-4 text-xl text-primary-purple font-bold">luminous453</h3>
                                        <div className="flex items-center justify-center gap-1 text-sm text-black dark:text-white">
                                            <Contact className="w-4 h-4" />
                                            <p>limonius</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="outline"
                                        className="w-full gap-2 border font-bold border-red-500 text-red-500 hover:text-white hover:bg-red-500 cursor-pointer"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Выйти из профиля
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card className="w-80">
                                <CardHeader>
                                    <CardTitle className="text-3xl font-semibold">
                                        Статистика
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-row justify-between">
                                            <p className="text-lg">Решено:</p>
                                            <p className="text-lg text-primary-purple font-bold">2 задачи</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p className="text-lg">В процессе:</p>
                                            <p className="text-lg text-primary-purple font-bold">3 задачи</p>
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
                                                <CardTitle className="text-2xl">Обо мне</CardTitle>
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
                                                <CardTitle className="text-2xl">Мои умения</CardTitle>
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
                                                <CardTitle className="text-2xl">Мои решения</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex items-center justify-center text-center text-base text-muted-foreground">
                                                <div className="flex flex-col gap-3 items-center">
                                                    Тут будут отображаться ваши решения задач...
                                                    <a href="/catalog">
                                                        <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white max-w-min text-base font-bold px-6"> Перейти к задачам </Button>
                                                    </a>
                                                </div>

                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                                <TabsContent value="security">
                                    <div className="flex flex-col gap-5">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-2xl">Сменить пароль</CardTitle>
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
                                                <CardTitle className="text-2xl">Отвязать ключ GitHub</CardTitle>
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
                                                <CardTitle className="text-2xl">Удалить аккаунт</CardTitle>
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
                                                <CardTitle className="text-2xl">В процессе</CardTitle>
                                            </CardHeader>
                                            <CardContent >
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                                        title="Трекер настроения"
                                                        description="Создайте многостраничный сайт для трекинга настроения пользователя с хранением состояния"
                                                        imageUrl="https://i.etsystatic.com/30134249/r/il/4277dd/3161817690/il_fullxfull.3161817690_j0un.jpg"
                                                        priceType="subscription"
                                                        category="Fullstack"
                                                        technologies={["React", "FastAPI", "JS/TS", "Python", "ML"]}
                                                        currentBugs={7}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-2xl">Завершенные</CardTitle>
                                            </CardHeader>
                                            <CardContent className="text-base flex flex-col gap-3 text-muted-foreground items-center py-15">
                                                Завершите задачу и прикрепите решение. Оно отобразится тут
                                                <a href="/publication">
                                                    <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white max-w-min text-base font-bold px-6"> Добавить решение </Button>
                                                </a>
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