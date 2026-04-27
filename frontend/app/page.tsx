import Image from "next/image";
import {Button} from "@/react/components/ui/button";

export default function Home() {
  return (
      <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
        {/* Хедер */}
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="text-xl font-bold text-black dark:text-white">КодМентор</div>
            <nav className="hidden gap-6 sm:flex">
              <Button variant="ghost" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer" >
                Каталог задач
              </Button>
              <Button variant="ghost" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer" >
                Топ решений
              </Button>
              <Button variant="ghost" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer" >
                Направления
              </Button>
            </nav>
            <div className="flex max-w-7xl items-center justify-between gap-3">
              <Button variant="outline" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer">
              Войти
              </Button>
              <Button className="hover:cursor-pointer">
              Регистрация
              </Button>
            </div>
          </div>
        </header>

        {/* Основной контент */}
        <main className="flex-1">
          <div className="flex flex-col items-center justify-center pl-30 pr-30 bg-white py-12 dark:bg-black gap-100">
            <div className="flex flex-row gap-75 px-6 text-center">
              <div className="flex flex-col gap-3 ">
                <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white max-w-">
                  Там, где <span className="text-white align-middle px-4 pb-2 rounded-full bg-blue-900">идеи</span>
                </h1>
                <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white max-w-">
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
            <div className="flex flex-row gap-100 items-start justify-between px-6 text-center ">
              <h2 className="text-lg leading-8  dark:text-zinc-400">
              Уже <span className="text-primary-purple underline">более 20</span> пет-проектов ждут вас!
            </h2>
              <div className="flex items-center justify-center gap-6 ">
                <Button variant="outline" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer ">
                    Каталог задач
                </Button>
                <Button className="">
                    Подключить GitHub
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Футер */}
        <footer className="border-t border-zinc-200 bg-black dark:border-zinc-800 dark:bg-black">
          <div className="mx-auto max-w-7xl px-9 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row">
              <div className="flex-col">
                <h1>КодМентор</h1>
                <h1>Там, где идеи находят людей</h1>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-white gap-2 m-3">Ссылки</h1>

                  <Button variant="link" className="hover:cursor-pointer text-white">
                    Главная
                  </Button>
                  <Button variant="link" className="hover:cursor-pointer text-white">
                    Каталог задач
                  </Button>
                  <Button variant="link" className="hover:cursor-pointer text-white">
                    Топ решений
                  </Button>
                  <Button variant="link" className="hover:cursor-pointer text-white">
                    Как получить портфолио
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
      </div>
  );
}

