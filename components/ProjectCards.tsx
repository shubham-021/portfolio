import { cn } from "@/lib/utils";

type ProjectCardsProp = {
    title: string[];
    description: string[];
    source: string;
    color?: string;
    bg?:string
    button?:string;
}

export default function ProjectCards({ title, description, source, color, bg, button }: ProjectCardsProp) {
    // h-[650px]
    return (
        <div className={cn(
            "flex flex-col max-w-[550px] w-full min-w-[300px] rounded-2xl border border-border mx-auto",
        )}>
            <div className={cn(
                "px-5 py-4 rounded-t-2xl border-b border-border",
                "bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_0,transparent_50%)]",
                "bg-size-[15px_15px] bg-center"
            )}>
                <div className="text-text text-4xl"><span className={cn("text-6xl",color)}>{title[0]}</span><span>{title[1]}</span></div>
            </div>
            <div className="text-text px-5 py-2 flex-1">
                {description.map((d,i) => (
                    <div key={i}>
                        {d}
                        {i !== description.length-1 && <><br/><br/></>}
                    </div>
                ))}
            </div>
            <div className={cn(
                "w-full flex justify-end py-2 px-5 border-t border-border rounded-b-2xl",
                "bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_0,transparent_50%)]",
                "bg-size-[15px_15px] bg-center"
            )}>
                <a href={source} target="_blank" rel="noopner noreferer" className={cn("text-text p-2 rounded-lg",button)}>{"Try now >"}</a>
            </div>
        </div>
    )
}