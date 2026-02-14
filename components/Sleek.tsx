import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function SleekBox({children,className}:{children:ReactNode,className?:string}){
    return(
        <div className={cn("flex w-full h-[30px] bg-[var(--cards)] items-center p-2 relative",className)}>
            <div className="absolute top-0 left-0 size-2 border-t border-l border-foreground"></div>
            <div className="absolute top-0 right-0 size-2 border-t border-r border-foreground"></div>
            <div className="absolute bottom-0 left-0 size-2 border-l border-b border-foreground"></div>
            <div className="absolute bottom-0 right-0 size-2 border-b border-r border-foreground"></div>
            {children}
        </div>
    )
}