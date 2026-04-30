import {Header} from "@/react/components/ui/header";
import {Footer} from "@/react/components/ui/footer";
export default function ProfileMain(){
    return(
        <div className="flex min-h-screen flex-col bg-background-main font-sans dark:bg-black">
            <Header/>
            <main className="flex-1">
                <div className="flex flex-col justify-center px-40 bg-background-main py-12 ml-8 gap-10">
                    <h1 className="text-5xl font-bold tracking-tight dark:text-white">
                        Личный кабинет
                    </h1>
                </div>
            </main>
            <Footer/>
        </div>
    )
}