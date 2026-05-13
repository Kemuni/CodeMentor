import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
import { Button } from "@/react/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/react/components/ui/card"
import { Input } from "@/react/components/ui/input"
import { Label } from "@/react/components/ui/label"
import {PasswordInput} from "@/react/components/ui/password-input";
import Image from "next/image";
import AsteriskSmall from "@/public/AsteriskSmall.svg";
import Ricky from "@/public/Ricky.svg";
import Teewee from "@/public/Teewee.svg";
export default function Register(){
    return (
        <div className="flex min-h-screen flex-col  font-sans dark:bg-black">
            <Header/>
            <main className="flex-1 bg-background-main ">
                <div className="flex flex-col justify-center px-40 bg-background-main pt-12 pb-8 gap-5">
                    <div className="flex flex-col items-center px-40 py-20 bg-background-main  relative">
                        <Image src={AsteriskSmall} alt="" className="w-30 h-auto absolute right-1/4 top-1/30"/>
                        <Image src={Ricky} alt="" className="w-50 h-auto absolute right-1/15 bottom-[10%] -rotate-20" />
                        <Image src={Teewee} alt="" className="w-50 h-50 absolute left-1/20 bottom-1/3 rotate-10" />
                        <Card className="w-full max-w-md ">
                            <CardHeader>
                                <h1 className="flex text-5xl font-medium font-[Tektur] mx-auto">Регистрация</h1>
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