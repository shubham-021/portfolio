import { CaseSensitive } from "lucide-react";
import { SleekBox } from "./Sleek";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Footer(){
    return(
        <div className="max-w-4xl w-full font-mono text-xs p-5 border-b border-border z-50">
            <div className={cn(
                "flex flex-row justify-end gap-2 sm:gap-5",
                "relative after:content-[''] after:absolute after:h-px after:w-screen after:pointer-events-none after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:bg-border after:z-50",
                "before:content-[''] before:pointer-events-none before:absolute before:left-1/2 before:-top-1 before:z-50 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border"
            )}>
                {/* <div className="flex gap-2 items-center">
                    <span>Inspiration :</span>
                    <Link href="https://chanhdai.com/" className="text-foreground underline" target="_blank" rel="noopener noreferrer">ChanDai</Link>
                </div> */}
                <div className="flex gap-2 items-center">
                    <CaseSensitive className="size-5 text-foreground"/><span>Geist Mono</span>
                </div>
            </div>
        </div>
    )
}