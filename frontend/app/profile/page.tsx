import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/react/components/ui/card";
import { Avatar, AvatarImage } from "@/react/components/ui/avatar";
import { Button } from "@/react/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/react/components/ui/tabs";
import {Contact, LogOut, SquarePen} from "lucide-react";

export default function ProfileMain() {
    return (
        <div className="flex min-h-screen flex-col bg-background-main font-sans dark:bg-black">
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
                                        <Avatar className="h-50 w-50">
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
                                                alt="@shadcn"
                                                className="grayscale"
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
                                        className="w-full gap-2 border font-bold border-red-500 text-red-500 hover:text-red-500"
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
                                    <Button variant="outline" className="w-full gap-2 border border-primary-purple text-primary-purple hover:text-primary-purple font-bold">
                                        К задачам
                                    </Button>
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
                                                    <Button variant="outline" className="gap-2 bg-primary-purple text-white hover:text-primary-purple font-bold">
                                                        Перейти к задачам
                                                    </Button>
                                                </div>

                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                                <TabsContent value="security">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Analytics</CardTitle>
                                            <CardDescription>
                                                Track performance and user engagement metrics. Monitor trends and
                                                identify growth opportunities.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            Page views are up 25% compared to last month.
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="challenges">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Reports</CardTitle>
                                            <CardDescription>
                                                Generate and download your detailed reports. Export data in
                                                multiple formats for analysis.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground">
                                            You have 5 reports ready and available to export.
                                        </CardContent>
                                    </Card>
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