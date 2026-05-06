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
import {PasswordInput} from "@/react/components/ui/password-input";
export default function Register(){
    return (
        <div className="flex min-h-screen flex-col  font-sans dark:bg-black">
            <Header/>
            <main className="flex-1 bg-background-main ">
                <div className="flex flex-col justify-center px-40 bg-background-main pt-12 pb-8 dark:bg-black gap-5">
                    <div className="flex flex-col items-center px-40 py-20 bg-background-main ">
                        <Card className="w-full max-w-md ">
                            <CardHeader>
                                <CardTitle className="flex text-5xl font-bold tracking-tight mx-auto">Регистрация</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Введите почту:</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                required
                                                className="bg-white border border-[#636363]"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Введите пароль:</Label>
                                            </div>
                                            <PasswordInput placeholder="Пароль" required={true}/>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Введите пароль ещё раз:</Label>
                                            </div>
                                            <PasswordInput placeholder="Повторите пароль" required={true}/>
                                        </div>

                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex-col gap-6">
                                <a href="/profile">
                                    <Button type="submit" className=" bg-primary-purple hover:bg-white hover:text-primary-purple border border-primary-purple ">
                                        Зарегистрироваться
                                    </Button>
                                </a>
                                <Button variant="outline" className="bg-black text-white px-6 hover:border hover:border-black ">
                                    Войти с помощью GitHub
                                </Button>
                                <span
                                    className=" inline-block text-sm underline-offset-4 "
                                >
                                    Уже есть аккаунт?  <a className="underline text-primary-purple hover:underline" href="/login"> Войти</a>
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