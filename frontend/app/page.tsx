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
          <div className="flex flex-col items-center justify-center px-40 bg-background-main py-12 dark:bg-black gap-125">
            <div className="flex flex-row justify-between px-8 text-center w-full">
              <div className="flex flex-col gap-3 text-primary-purple">
                <h1 className="text-5xl font-bold tracking-tight dark:text-white">
                  Там, где <span className="text-white align-middle px-4 pb-2 rounded-full bg-primary-purple">идеи</span>
                </h1>
                <h1 className="text-5xl font-bold tracking-tight dark:text-white">
                  находят людей
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
              Уже <span className="text-primary-purple underline">более 20</span> пет-проектов ждут вас!
            </h2>
              <div className="flex items-center justify-center gap-6 ">
                <a href="/catalog">
                  <Button variant="outline" className="text-primary-purple border border-primary-purple hover:bg-primary-purple hover:text-white hover:cursor-pointer">
                    Каталог задач
                  </Button>
                </a>
                <Button className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:cursor-pointer hover:bg-white">
                    Подключить GitHub
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pt-6 pl-40 pr-40 bg-white py-6 dark:bg-black gap-8">
            <div className="flex flex-col gap-3 px-6 text-center ">
              <p className="tracking-tight text-primary-purple dark:text-white max-w-">
                Отзывы
              </p>
              <h1 className="text-primary-purple text-5xl font-bold tracking-tight dark:text-white">
                Что о нас говорят
              </h1>
            </div>
            <div className="flex flex-row gap-3 px-6 items-stretch ">
              <div className="flex flex-col gap-3 px-6 py-4.5 items-start border  border-[#DEDEDE]  rounded-md flex-1">
                <p className="items-start">
                  “Есть над чем задуматься: некоторые особенности внутренней политики формируют глобальную экономическую сеть однозначно”
                </p>
                <div className="flex gap-4 mt-auto">
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


              </div>
              <div className="flex flex-col gap-3 px-6 py-4.5 items-start border border-[#DEDEDE] rounded-md flex-1  ">
                <p>
                  “Есть над чем задуматься: некоторые особенности внутренней. В своём стремлении повысить качество жизни, они забывают, что выбранный нами инновационный”
                </p>
                <div className="flex gap-4">
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
              </div>
            </div>
            <div className="flex flex-row gap-3 px-6 items-stretch w-full">
              <div className="flex flex-col gap-3 text-white px-8 py-6 items-start rounded-md flex-1 bg-black">
                <p>
                  Почему мы?
                </p>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl tracking-tight dark:text-white">
                    Помогаем по-настоящему
                  </h2>
                  <h2 className="text-3xl tracking-tight dark:text-white">
                    проявить себя
                  </h2>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col border-b border-white/15 pb-4">
                      <h1 className="text-primary-purple text-xl font-bold">
                        001
                      </h1>
                      <p className="text-xl">
                        Разнообразие тем
                      </p>
                      <p className="text-sm">
                        Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-col border-b border-white/15 pb-4">
                        <p className="text-primary-purple text-xl font-bold">
                          002
                        </p>
                        <p className="text-xl">
                          Подходит даже новичкам
                        </p>
                        <p className="text-sm">
                          Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col border-b border-white/15 pb-4">
                      <p className="text-primary-purple text-xl font-bold">
                        003
                      </p>
                      <p className="text-xl">
                        Различная сложность
                      </p>
                      <p className="text-sm">
                        Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-col border-b border-white/15 pb-4">
                        <p className="text-primary-purple text-xl font-bold">
                          004
                        </p>
                        <p className="text-xl">
                          Интересные задачи
                        </p>
                        <p className="text-sm">
                          Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pt-6 pl-40 pr-40 bg-background-main py-30 dark:bg-black gap-8">
            <div className="flex flex-col gap-3 px-6 text-center ">
              <p className="tracking-tight text-primary-purple dark:text-white max-w-">
                С чего начать
              </p>
              <h1 className="text-primary-purple text-5xl font-bold tracking-tight dark:text-white">
                Как получить портфолио?
              </h1>
            </div>
            <div className="flex flex-col gap-8 items-start text-start w-full px-20">
              <div className="flex flex-col gap-3 items-start text-start px-6">
                <h1 className="text-primary-purple text-5xl text-bold">
                  1.
                </h1>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl text-bold tracking-tight dark:text-white">
                    Регистрация на сайте
                  </h2>
                  <p className="text-sm tracking-tight dark:text-white">
                    Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start text-start px-6">
                <h1 className="text-primary-purple text-5xl text-bold">
                  2.
                </h1>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl text-bold tracking-tight dark:text-white">
                    Выбор задачи
                  </h2>
                  <p className="text-sm tracking-tight dark:text-white">
                    Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start text-start px-6">
                <h1 className="text-primary-purple text-5xl text-bold">
                  3.
                </h1>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl text-bold tracking-tight dark:text-white">
                    Реализация решения
                  </h2>
                  <p className="text-sm tracking-tight dark:text-white">
                    Принимая во внимание показатели успешности, дальнейшее развитие различных форм деятельности.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start text-start px-6">
                <h1 className="text-primary-purple text-5xl text-bold">
                  4.
                </h1>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl text-bold tracking-tight dark:text-white">
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

