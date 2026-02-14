import { cn } from "@/lib/utils";
import { SleekBox } from "./Sleek";

const AboutPoints = [
    "Hey, I'm Shubham Singh ,a full-stack developer.",
    "Graduated in 2025 with BTech in CSE from Lucknow University.",
    "Qualified GATE 2024 and 2025 conducted by IISc Banglore and IIT Roorkee.",
    "I work mostly with JavaScript stack, right now exploring GenAI/ Applied AI.",
    "That's it. Nothing much to tell about...`yet`"
  ]

export default function About(){
    return(
        <div className="max-w-4xl w-full flex flex-col gap-5 justify-start font-mono pt-10 pb-5 pl-5 pr-5 z-50">
             <header className="flex justify-between items-end gap-8 px-0 w-full">
                  <div>
                    <div className="flex whitespace-nowrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      <span className="w-2 h-2  bg-foreground rounded-full animate-pulse" />
                      Identify: User
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                      About_<br />Me
                    </h1>
                  </div>
                  <div className="hidden min-[365px]:block text-right text-xs text-muted-foreground space-y-1 font-mono">
                    <p>ID: USR-007-PF</p>
                    <p>LOC: 127.0.0.1</p>
                  </div>
             </header>

            <div>
                <div className={cn(
                  "flex flex-col gap-1 pl-2 pt-2",
                  "relative before:content-[''] before:absolute before:pointer-events-none before:bg-border before:w-screen before:h-px before:top-0 before:left-1/2 before:-translate-x-1/2 before:z-50"
                )}>
                    {AboutPoints.map((a,i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <div className="size-[5px] rounded-full bg-text"/>
                            <div className="text-sm">
                                {a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}