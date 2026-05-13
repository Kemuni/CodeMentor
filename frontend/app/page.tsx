import Asteriks from "@/public/asteriks.svg";
import AsteriksBorder from "@/public/asteriksBorder.svg";
import AsteriksFull from "@/public/asteriksFull.svg";
import AsteriskBlur from "@/public/AsteriskBlur.svg";
import AsteriskFull from "@/public/AsteriskFull.svg";
import Asteriks2 from "@/public/asteriks2.svg";
import Butterfly from "@/public/Butterfly.svg";
import Ricky from "@/public/Ricky.svg";
import Teewee from "@/public/Teewee.svg";
import TeeweeSmall from "@/public/TeeweeSmall.svg";
import TeeweeBlur from "@/public/TeeweeBlur.svg";
import RhodeIsland from "@/public/RhodeIsland.svg";
import Lampa from "@/public/Lampa.svg";
import Comma from "@/public/Comma.svg";


import Image from "next/image"

import {Button} from "@/react/components/ui/button";
import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
import {Avatar, AvatarImage} from "@/react/components/ui/avatar";

export default function Home() {
  return (
      <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
        {/* Хедер */}
        <Header/>

        {/* Основной контент */}
        <main className="flex-1">
          <div className="flex flex-col relative items-center justify-center px-40 bg-background-main py-12 dark:bg-black gap-125">
            <Image src={Asteriks} alt="" className="w-50 h-auto absolute left-1/3 bottom-1/4 " />
            <Image src={Asteriks2} alt="" className="w-50 h-auto absolute left-1/9 top-1/3 " />
            <Image src={Butterfly} alt="" className="w-40 h-auto absolute left-1/2 top-1/4 " />
            <Image src={Ricky} alt="" className="w-50 h-auto absolute right-1/4 top-1/3 " />
            <Image src={Teewee} alt="" className="w-50 h-50 absolute right-1/6 bottom-1/5 " />
            <Image src={RhodeIsland} alt="" className="w-50 h-50 absolute right-1/9 top-1/3 " />
            <div className="flex flex-row justify-between px-8 text-center w-full">

              <div className="flex flex-col gap-3 text-primary-purple">
                <h1 className="text-5xl font-[tektur] font-medium">
                  ТАМ, ГДЕ <span className="text-white align-middle px-4 rounded-full bg-primary-purple">ИДЕИ</span>
                </h1>
                <h1 className="text-5xl font-[tektur] font-medium">
                  НАХОДЯТ ЛЮДЕЙ
                </h1>
              </div>
              <div className="flex flex-col items-start ">
                <p className=" text-black text-lg  dark:text-zinc-400">
                  Задачи, которые сделают из Вас
                </p>
                <p className="text-black text-lg  dark:text-zinc-400">
                  достойных разработчиков
                </p>
                <div className="flex flex-row gap-1.5 pb-2 pt-2">
                  <p className="text-black outline-1 outline-black align-middle px-4 rounded-full"> backend</p>
                  <p className="text-black outline-1 outline-black align-middle px-4 rounded-full"> машинное обучение</p>
                  <p className="text-black outline-1 outline-black align-middle px-4 rounded-full"> fullstack</p>

                </div>
                <div className="flex flex-row gap-1.5 ">
                  <p className="text-black outline-1 outline-black align-middle px-4 rounded-full"> портфолио</p>
                  <p className="text-black outline-1 outline-black align-middle px-4 rounded-full"> обучение</p>
                </div>


              </div>

            </div>
            <div className="flex flex-row items-start justify-between px-10 text-center w-full">
              <h2 className="text-lg leading-8  dark:text-zinc-400">
              Уже <span className="text-primary-purple underline font-bold">более 20</span> пет-проектов ждут вас!
            </h2>
              <div className="flex items-center justify-center gap-6 ">
                <a href="/catalog">
                  <Button variant="outline" className="text-primary-purple px-6 border border-primary-purple hover:bg-primary-purple hover:text-white hover:cursor-pointer">
                    Каталог задач
                  </Button>
                </a>
                <a href="/login">
                  <Button className="bg-primary-purple px-8 border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white">
                      Подключить GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pt-6 pl-40 pr-40 bg-white py-6 dark:bg-black gap-8">
            <div className="flex flex-col gap-3 px-6 text-center items-center ">
              <div className="flex flex-row gap-2 items-center text-center">
                <Image src={Lampa} alt="" className="w-5 h-5 " />
                <p className="text-primary-purple ">
                  Отзывы
                </p>
              </div>

              <h1 className="text-primary-purple text-5xl font-[Tektur] font-medium">
                Что о нас говорят
              </h1>
            </div>
            <div className="flex flex-row gap-3 px-6 items-stretch ">
              <div className="flex flex-col gap-3 px-6 py-4.5 items-start border  border-[#DEDEDE]  rounded-md flex-1">
                <p className="flex-1">
                  “Есть над чем задуматься: некоторые особенности внутренней политики формируют глобальную экономическую сеть однозначно”
                </p>
                <div className="flex flex-row w-full">
                  <div className="flex gap-4 mt-auto w-full">
                    <Avatar className="h-15 w-15 ">
                      <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="grayscale z-10"
                      />
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-lg mt-auto">
                        Моисеенко Александр
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ведущий разработчик
                      </p>
                    </div>
                  </div>

                  <Image src={Comma} alt="" className="w-10 h-10 text-center my-auto" />

                </div>



              </div>
              <div className="flex flex-col gap-3 px-6 py-4.5 items-start border border-[#DEDEDE] rounded-md flex-1  ">
                <p className="flex-1">
                  “Есть над чем задуматься: некоторые особенности внутренней. В своём стремлении повысить качество жизни, они забывают, что выбранный нами инновационный”
                </p>
                <div className="flex flex-row w-full">
                  <div className="flex gap-4 my-auto w-full">
                    <Avatar className="h-15 w-15 ">
                      <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="grayscale z-10"
                      />
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-lg mt-auto">
                        Новиков Даниил
                      </p>
                      <p className="text-sm text-muted-foreground">
                        HR-менеджер
                      </p>
                    </div>
                  </div>
                  <Image src={Comma} alt="" className="w-10 h-10 text-center my-auto" />
                </div>

              </div>
            </div>
            <div className="flex flex-row gap-3 px-6 items-stretch w-full ">
              <div className="flex flex-col gap-3 text-white px-8 py-6 items-start rounded-md flex-1 bg-black relative overflow-hidden">
                <Image src={AsteriksBorder} alt="" className="w-45 h-45 absolute right-0 top-0" />
                <Image src={AsteriskBlur} alt="" className="w-45 h-45 absolute right-1/2 bottom-[-3%]" />
                <Image src={AsteriskFull} alt="" className="w-25 h-25 absolute left-[41%] bottom-0" />
                <Image src={AsteriksFull} alt="" className="w-35 h-35 absolute right-1/210 top-0" />
                <Image src={TeeweeBlur} alt="" className="w-35 h-35 absolute right-1/2 top-0" />
                <Image src={TeeweeSmall} alt="" className="w-20 h-20 absolute left-[42%] top-0" />
                <div className="flex flex-row gap-2 items-center text-center">
                  <Image src={Lampa} alt="" className="w-5 h-5 " />
                  <p className="font-light">
                    Почему мы?
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-[tektur] font-light">
                    Помогаем по-настоящему
                  </h2>
                  <h2 className="text-3xl font-[tektur] font-light">
                    проявить себя
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                  <div className="flex flex-col border-b border-white/15 pb-4">
                    <h1 className="text-xl text-[#B6A2D4] font-[tektur] font-medium">
                      001
                    </h1>
                      <p className="text-xl font-[tektur] font-medium">
                        Разнообразие тем
                      </p>
                    <p className="text-sm">
                      Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                    </p>
                  </div>
                    <div>
                      <div className="flex flex-col border-b border-white/15 pb-4">
                        <p className="text-xl text-[#B6A2D4] font-[tektur] font-medium">
                          002
                        </p>
                        <p className="text-xl font-[tektur] font-medium">
                          Подходит даже новичкам
                        </p>
                        <p className="text-sm">
                          Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col border-b border-white/15 pb-4">
                      <p className="text-xl text-[#B6A2D4] font-[tektur] font-medium">
                        003
                      </p>
                      <p className="text-xl font-[tektur] font-medium">
                        Различная сложность
                      </p>
                      <p className="text-sm">
                        Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-col border-b border-white/15 pb-4">
                        <p className="text-xl text-[#B6A2D4] font-[tektur] font-medium">
                          004
                        </p>
                        <p className="text-xl font-[tektur] font-medium">
                          Интересные задачи
                        </p>
                        <p className="text-sm">
                          Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                        </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">

                  </div>
                </div>


              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pt-6 pl-40 pr-40 bg-background-main py-30 relative">
            <Image src={Asteriks} alt="" className="w-30 h-30 absolute right-[30%] top-1/4 " />
            <Image src={Asteriks2} alt="" className="w-40 h-40 absolute right-1/9 top-1/3 " />
            <Image src={Ricky} alt="" className="w-40 h-40 absolute right-1/3 top-1/2 -rotate-30" />
            <Image src={Teewee} alt="" className="w-40 h-40 absolute right-1/6 bottom-1/8 rotate-20" />
            <div className="flex flex-col gap-3 px-6 text-center items-center">
              <div className="flex flex-row gap-2 items-center text-center">
                <Image src={Lampa} alt="" className="w-5 h-5 " />
                <p className="font-light text-primary-purple ">
                  С чего начать
                </p>
              </div>
              <h1 className="text-primary-purple text-5xl font-[Tektur] font-medium">
                Как получить портфолио?
              </h1>
            </div>
            <div className="flex flex-col gap-8 items-start text-start w-full px-20">
              <div className="flex flex-col gap-3 items-start text-start px-6">
                <h1 className="text-primary-purple text-5xl font-[Tektur] font-bold">
                  1.
                </h1>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-[Tektur] font-medium">
                    Регистрация на сайте
                  </h2>
                  <p className="text-sm tracking-tight dark:text-white">
                    Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start text-start px-6">
                <h1 className="text-primary-purple text-5xl font-[Tektur] font-bold">
                  2.
                </h1>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-[Tektur] font-medium">
                    Выбор задачи
                  </h2>
                  <p className="text-sm tracking-tight dark:text-white">
                    Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start text-start px-6">
                <h1 className="text-primary-purple text-5xl font-[Tektur] font-bold">
                  3.
                </h1>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-[Tektur] font-medium">
                    Реализация решения
                  </h2>
                  <p className="text-sm tracking-tight dark:text-white">
                    Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start text-start px-6">
                <h1 className="text-primary-purple text-5xl font-[Tektur] font-bold">
                  4.
                </h1>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-[Tektur] font-medium">
                    Портфолио готово!
                  </h2>
                  <p className="text-sm tracking-tight dark:text-white">
                    Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Футер */}
        <Footer />
      </div>
  );
}

