import { SleekBox } from "./Sleek";

export default function Favorites(){
    return(
        <div className="max-w-4xl w-full font-mono pt-10 pb-5 pl-5 pr-5 border-b border-border">
            <div className="flex flex-col gap-5 justify-start">
                <SleekBox className="w-[150px]">
                        <span>Favorites</span>
                </SleekBox>

                <div className="w-full h-[100px] flex gap-5 py-2">
                    <div className="h-full w-full rounded-lg flex items-center px-2 border border-border">
                        <div className="size-15 bg-amber-200 rounded-lg"/>
                    </div>
                    <div className="h-full w-full rounded-lg flex items-center justify-between px-2 border border-border">
                        <div className="size-15 bg-amber-200 rounded-lg"/>
                    </div>
                    <div className="h-full w-full rounded-lg flex items-center px-2 border border-border">
                        <div className="size-15 bg-amber-200 rounded-lg"/>
                    </div>
                </div>
            </div>
        </div>
    )
}