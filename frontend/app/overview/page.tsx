import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
import {TaskDetailCard} from "@/react/components/ui/card-overview";
import {Card, CardContent, CardHeader, CardTitle} from "@/react/components/ui/card";
import Image from "next/image";
import AsteriskSmall from "@/public/AsteriskSmall.svg";


export default function Overview() {
    return (
        <div className="flex min-h-screen flex-col bg-background-main dark:bg-black">
            <Header />
            <main className="flex-1">
                <div className="flex flex-col ml-8 px-40 bg-background-main pt-12 pb-30 gap-8 relative">
                    <h1 className="text-5xl font-[tektur] font-medium text-black mb-8">
                        <span className="underline decoration-wavy decoration-primary-purple underline-offset-10"> Обзор</span> задачи
                    </h1>
                    <Image src={AsteriskSmall} alt="" className="w-25 h-25 absolute left-[29%] top-[1%] " />
                    <TaskDetailCard
                        imageUrl="https://edu-sigma.ru/wp-content/uploads/2023/05/%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.jpg"
                        title="Тест скорости печати"
                        description="Реализуйте сайт для оценки скорости печатания пользователя, рассчитайте количество слов в минуту и точность, а также иные параметры."
                        solutionsCount={250}
                        viewsCount={2000}
                        priceType={"free"}
                        category={"Frontend"}
                        technologies={["React", "JS/TS"]}
                        currentBugs={2}/>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>
                                <h1 className="text-3xl font-[tektur] font-medium ">
                                    Техническое задание
                                </h1>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Ваша задача состоит в том, чтобы создать это приложение для проверки скорости набора текста и максимально приблизить его к дизайну.
                                <br/>
                                <br/> Вы можете использовать любые инструменты, которые вам нравятся, чтобы выполнить задание. Так что, если у вас есть что-то, в чем вы хотели бы попрактиковаться, не стесняйтесь.
                                <br/>
                                <br/> Мы храним данные о прохождении в локальном файле data.json. Вы можете использовать его для случайного выбора прохождений различной сложности.
                                <br/>
                                <br/> Ваши пользователи должны иметь возможность:
                                <br/>- Начать тест, нажав кнопку "Пуск" или щелкнув по прохождению и введя
                                <br/>- Выберите уровень сложности (Легкий, средний, сложный) для прохождения различной сложности
                                <br/>- Переключайтесь между режимом "Таймер (60 секунд)" и режимом "Прохождение" (таймер отсчитывает время, без ограничений)
                                <br/> - Перезапускайте в любое время, чтобы получить новое случайное прохождение выбранной сложности
                                <br/>- Смотрите статистику WPM, точности и времени в реальном времени во время набора текста
                                <br/>- Смотрите визуальную обратную связь, показывающую правильные символы (зеленые), ошибки (красные/ подчеркнутые) и положение курсора
                                <br/>- Исправляйте ошибки с помощью пробела (исходные ошибки по-прежнему учитываются при определении точности)
                                <br/>- Просматривайте результаты, показывающие WPM, точность и символы (правильные/ неправильные) после завершения теста
                                <br/>- Увидев сообщение "Базовый уровень установлен!" во время своего первого теста, они устанавливают свой личный рекорд
                                <br/>- Наблюдайте за тем, как участники, побившие свой личный рекорд, празднуют победу с помощью конфетти.
                                <br/>- Следите за тем, чтобы их личный рекорд сохранялся в течение сеансов с помощью localStorage
                                <br/>- Просматривайте оптимальную компоновку в зависимости от размера экрана своего устройства
                                <br/>- Смотрите состояния наведения курсора мыши и фокусировки для всех интерактивных элементов
                                <br/> - Загрузите проект и ознакомьтесь с файлом README.md. Это предоставит более подробную информацию о проекте и поможет вам настроиться.
                                <br/>
                                <br/>Хотите получить поддержку в решении задачи? Присоединяйтесь к нашему сообществу и задавайте вопросы в канале помощи.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}