import {Button} from "@/react/components/ui/button";

export default function Home() {
  return (
      <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
        {/* Хедер */}
        <header className="sticky top-0 z-10 border-b border-zinc-200 bg-background-main backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
          <div className="grid grid-cols-3 items-center justify-between px-50 py-4">
            <div className="text-xl font-bold text-black dark:text-white">КодМентор</div>
            <nav className="hidden gap-6 sm:flex justify-center">
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
            <div className="flex items-center justify-end gap-3">
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
          <div className="flex flex-col items-center justify-center px-40 bg-background-main py-12 dark:bg-black gap-125">
            <div className="flex flex-row justify-between px-8 text-center w-full">
              <div className="flex flex-col gap-3 text-primary-purple">
                <h1 className="text-5xl font-bold tracking-tight dark:text-white">
                  Там, где <span className="text-white align-middle px-4 pb-2 rounded-full bg-blue-900">идеи</span>
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
                <Button variant="outline" className="text-primary-purple hover:text-primary-purple hover:cursor-pointer ">
                    Каталог задач
                </Button>
                <Button className="">
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
                <p className="mt-auto">
                  Моисеенко Александр
                </p>
              </div>
              <div className="flex flex-col gap-3 px-6 py-4.5 items-start border border-[#DEDEDE] rounded-md flex-1  ">
                <p>
                  “Есть над чем задуматься: некоторые особенности внутренней. В своём стремлении повысить качество жизни, они забывают, что выбранный нами инновационный”
                </p>
                <p className="mt-auto">
                  Новиков Даниил
                </p>
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
                      <h1 className="text-[#B6A2D4] text-xl">
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
                        <p className="text-[#B6A2D4] text-xl">
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
                      <p className="text-[#B6A2D4] text-xl">
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
                        <p className="text-[#B6A2D4] text-xl">
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

