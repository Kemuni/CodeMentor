import {Button} from "@/react/components/ui/button";
import Image from "next/image";
import LogoWhite from "@/public/LogoWhite.svg";
import LampaBlur from "@/public/LampaBlur.svg";
import RickyBlur from "@/public/RickyBlur.svg";
import AsteriskBlur2 from "@/public/AsteriskBlur2.svg";


export function Footer(){
    return (
        <footer className="border-t border-zinc-200 bg-black relative overflow-hidden">
            <Image src={LampaBlur} alt="" className="w-50 h-50 absolute right-[30%] top-0 " />
            <Image src={RickyBlur} alt="" className="w-50 h-50 absolute right-0 top-0 " />
            <Image src={AsteriskBlur2} alt="" className="w-60 h-60 absolute left-1/5 top-0 " />
            <Image src={AsteriskBlur2} alt="" className="w-40 h-40 absolute left-[22.2%] top-[16%] " />
            <div className="mx-10 px-9 py-5 sm:px-6 lg:px-8">
                <div className="flex flex-row items-center justify-between gap-4 text-sm ">
                    <div className="flex-col mb-auto">
                        <a href="/">
                            <Image src={LogoWhite} alt="" className="w-30 h-20 " />
                        </a>
                        <h1 className="text-lg text-[#636363] font-[Tektur] font-light">Там, где идеи </h1>
                        <h1 className="text-lg text-[#636363] font-[Tektur] font-light"> находят людей </h1>
                    </div>
                    <div className="flex flex-col items-start mb-auto">
                        <h1 className="text-xl gap-2 m-3 font-[Tektur] font-light text-white">Ссылки</h1>
                        <a href="/">
                            <Button variant="link" className="hover:cursor-pointer text-white"> Главная </Button>
                        </a>
                        <a href="/catalog">
                            <Button variant="link" className="hover:cursor-pointer text-white"> Каталог задач </Button>
                        </a>
                        <a href="/">
                            <Button variant="link" className="hover:cursor-pointer text-white"> Топ решений </Button>
                        </a>
                        <a href="/">
                            <Button variant="link" className="hover:cursor-pointer text-white"> Как получить портфолио </Button>
                        </a>
                    </div>
                    <div className="flex flex-col mb-auto mr-20">
                        <h1 className="text-xl pb-2 text-white font-[Tektur] font-light">Контакты</h1>
                        <div className="flex gap-3 flex-row ">
                            <p className="text-[#636363] ">Телефон:</p>
                            <p className="text-white">+7 (999) 999-99-99</p>
                        </div>
                        <div className="flex gap-3 flex-row">
                            <p className="text-[#636363]">Email:</p>
                            <p className="text-white">support@kodmentor.ru</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}