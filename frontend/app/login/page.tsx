import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
import { Button } from "@/react/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/react/components/ui/card"
import { Input } from "@/react/components/ui/input"
import { Label } from "@/react/components/ui/label"
export default function Auth(){
    return (
        <div className="flex min-h-screen flex-col  font-sans dark:bg-black">
            <Header/>
            <main className="flex-1 bg-background-main ">
                <div className="flex flex-col justify-center px-40 bg-background-main pt-12 pb-8 dark:bg-black gap-5">
                    <div className="flex flex-col items-center px-40 py-20 bg-background-main ">
                        <Card className="w-full max-w-md ">
                            <CardHeader>
                                <CardTitle className="flex text-5xl font-bold tracking-tight mx-auto">Авторизация</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Введите почту</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Введите пароль</Label>
                                            </div>
                                            <Input id="password" type="password" placeholder="**********" required />
                                            <span
                                            className=" inline-block text-sm underline-offset-4"
                                        >
                                            Забыли пароль? <a className="underline text-primary-purple" href="#"> Восстановить пароль</a>
                                        </span>
                                        </div>

                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex-col gap-6">
                                <Button type="submit" className=" bg-primary-purple hover:bg-gray-400 hover:text-white ">
                                    Авторизоваться
                                </Button>
                                <Button variant="outline" className="bg-black text-white px-6">
                                    Войти с помощью GitHub
                                </Button>
                                <span
                                    className=" inline-block text-sm underline-offset-4 "
                                >
                                    Нет аккаунта?  <a className="underline text-primary-purple hover:underline" href="/register"> Зарегистрироваться</a>
                                </span>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </main>
            <Footer/>
        </div>

    )
}