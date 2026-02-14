import { HeroLayoutGuides, HeroLayoutGuidesMin, HorizontalStripe } from "@/components/LayoutGuides";
import { SleekBox } from "@/components/Sleek";
import { cn } from "@/lib/utils";
import { CaseSensitive, Clock, Github, Mailbox, MapPin, Mars, PhoneCall, Twitter } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StarsBackground } from "./ui/stars-background";
import { ShootingStars } from "./ui/shooting-stars";

export default function Hero() {

  const date = new Date();

  return (
    <div className="min-h-screen relative flex flex-col items-center border-b border-border font-mono">
      {/* <ShootingStars />
      <StarsBackground /> */}
      <div className="fixed top-6 right-8 lg:right-14 z-50">
        <ThemeToggle />
      </div>

      <div className="grid max-w-4xl flex-1 grid-rows-3 relative w-full">
        <div className="relative flex items-center justify-center font-bold font-arka text-8xl text-foreground">
          {/* <div className="absolute h-10 w-full flex justify-end p-6 top-5 font-mono text-lg">
            <CaseSensitive/><span className="text-white">Geist Mono</span>
          </div> */}
          Arka
        </div>
        <div
          className={cn(
            "row-span-2",
            "bg-[radial-gradient(var(--repeating-lines)_2px,transparent_0)] bg-size-[15px_15px] bg-center",
            "grid grid-rows-[180px_1fr] min-[710px]:grid-rows-[228px_1fr]",
            "double-line",
          )}
        >
{/* 
          <div className={cn(
            "grid min-[710px]:hidden grid-rows-[150px_1fr_1fr]",
            "relative after:content-[''] after:absolute after:w-screen after:bottom-0 after:h-px after:bg-border after:pointer-events-none after:z-50 after:left-1/2 after:-translate-x-1/2"
          )}>
            <div className="flex items-center">
              <div className="h-full flex items-center border-r border-border px-6">
                <div className="size-32 rounded-full bg-[url(/profile.jpg)] border border-foreground/20 ring ring-border ring-offset-2 ring-offset-background bg-center bg-size-[auto_250px]" />
              </div>
                <div className="w-full h-full flex flex-col text-white justify-between pt-2">
                  <div className="px-2">
                    <div className="flex items-center gap-2 text-text text-sm"><div className="size-2 rounded-full bg-foreground" />Available</div>
                  </div>
                  <div>
                    <div className="border-t border-border w-full">
                      <div className="flex flex-wrap gap-2 items-baseline text-text px-2">
                        <span className="font-bold text-xl  min-[526]:text-3xl">Shubham</span><span className="font-bold text-xl  min-[526]:text-3xl">Singh</span>
                        <span className="text-sm text-foreground">BTech CSE'25</span>
                      </div>
                    </div>
                    <div className="text-sm text-foreground px-2 pb-px border-t border-border">
                      <span>FullStack Engineer</span>
                    </div>
                  </div>
                </div>
            </div>
            <div className="row-span-2 bg-red-300"></div>
          </div> */}

          <div className={cn(
            "grid min-[535px]:hidden grid-rows-[40px_1fr]",
            "relative after:content-[''] after:absolute after:w-screen after:bottom-0 after:h-px after:bg-border after:pointer-events-none after:z-50 after:left-1/2 after:-translate-x-1/2"
          )}>
            <div className="flex flex-row justify-between border-b border-border items-end p-2 gap-5">
                <div className="flex items-center gap-2 text-text text-xs"><div className="size-2 rounded-full bg-foreground animate-pulse" />Available</div>
                <div className="w-fit text-xs whitespace-nowrap">
                  <span className="text-text">Currently :</span><span className="text-foreground">`Building Once`</span>
                </div>
            </div>
            <div className="flex px-2">
              <div className="flex justify-center items-center border-r border-border pr-2">
                <div className="size-[105px] rounded-full bg-[url(/profile.jpg)] border border-foreground/20 ring ring-border ring-offset-2 ring-offset-background bg-center bg-size-[auto_180px]" />
              </div>
              <div className="flex flex-col h-full text-white justify-end pl-2 py-4">
                  <div className="flex gap-2 items-baseline text-text flex-nowrap">
                    <span className="font-bold text-xl min-[450px]:text-[28px]">Shubham</span><span className="font-bold text-xl min-[450px]:text-[28px]">Singh</span>
                    <span className="text-xs text-foreground hidden min-[385px]:block">BTech CSE'25</span>
                    <span className="text-xs text-foreground block min-[385px]:hidden">CSE'25</span>
                  </div>
                  <div className="text-xs min-[450px]:text-sm text-text">
                    <span className="text-foreground">Fullstack Engineer</span>
                  </div>
              </div>
            </div>
          </div>

          <div className={cn(
            "hidden min-[535px]:grid min-[710px]:grid-cols-[250px_1fr_1fr] grid-cols-[200px_1fr_1fr]",
            "relative after:content-[''] after:absolute after:w-screen after:bottom-0 after:h-px after:bg-border after:pointer-events-none after:z-50 after:left-1/2 after:-translate-x-1/2"
          )}>
            <div className="flex justify-center items-center border-r border-border">
              <div className="min-[710px]:size-52 size-36 rounded-full bg-[url(/profile.jpg)] border border-foreground/20 ring ring-border ring-offset-2 ring-offset-background bg-center bg-size-[auto_250px]" />
            </div>
            <div className="col-span-2 grid grid-rows-3" >
              <div className="flex flex-row justify-between border-b border-border items-end p-2 gap-2">
                <div className="flex items-center gap-2 text-text text-xs min-[655px]:text-sm min-[750px]:text-base"><div className="size-2 rounded-full bg-foreground" />Available</div>
                <SleekBox className="w-[210px] min-[655px]:w-[250px] min-[750px]:w-[300px] text-xs min-[655px]:text-sm min-[750px]:text-base">
                  <span className="text-white">Currently :</span><span className="text-foreground">`Building Once`</span>
                </SleekBox>
              </div>
              <div className="row-span-2">
                <div className="flex flex-col h-full text-white justify-end p-2">
                  <div className="flex flex-wrap gap-2 items-baseline text-text">
                    <span className="font-bold text-xl min-[655px]:text-2xl">Shubham</span><span className="font-bold text-xl min-[655px]:text-2xl">Singh</span>
                    <span className="text-xs min-[655px]:text-sm text-foreground">BTech CSE'25</span>
                  </div>
                  <div className="text-xs min-[655px]:text-sm text-text">
                    <span>Currently, a </span><span className="text-foreground">Fullstack Engineer</span><span> (who knows what future holds)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-rows-3">
            <div></div>
            <div className="flex justify-between row-span-2 items-end pb-5 gap-4 whitespace-nowrap">
              <div className="">
                <div className="flex flex-col gap-3 text-foreground pl-2 min-[535px]:pl-6">
                  <span className="flex items-center gap-2"><PhoneCall className="size-4" /><span className="text-sm text-text">+91 7266854153</span></span>
                  <span className="flex items-center gap-2"><Mailbox className="size-4" /><a href="https://mail.google.com/mail/?view=cm&fs=1&to=shubham.arka@gmail.com" target="_blank" rel="noopner noreferer" className="text-sm text-text no-underline">shubham.arka@gmail.com</a></span>
                  <span className="flex items-center gap-2"><Github className="size-4" /><a href="https://github.com/shubham-021" target="_blank" rel="noopner noreferer" className="text-sm text-text">shubham-021</a></span>
                  <span className="flex items-center gap-2"><Twitter className="size-4" /><a href="https://x.com/ShubhamArka" target="_blank" rel="noopner noreferer" className="text-sm text-text">@ShubhamArka</a></span>
                </div>
              </div>
              <div className="flex flex-col items-start pl-0 justify-self-end gap-3 text-foreground pr-2 min-[535px]:pr-6">
                <span className="flex items-center gap-2"><Clock className="size-4" /><span className="text-sm text-text">{date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></span>
                <span className="flex items-center gap-2"><MapPin className="size-4" /><span className="text-sm text-text">India</span></span>
                <span className="flex items-center gap-2"><Mars className="size-4" /><span className="text-sm text-text">he/him</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
