import { ChevronsUpDown, GitMergeIcon, GitPullRequestArrow, GitPullRequestClosed, Link } from "lucide-react";
import GitHubContributionChart from "./GithubContributionChart";
import { HeroLayoutGuides } from "./LayoutGuides";
import { SleekBox } from "./Sleek";
import { cn } from "@/lib/utils";
import { useCallback, useState, memo } from "react";
import { motion } from "motion/react";
import { ExpandableCard } from "./ExpandableCards";
import contributions from "@/lib/Contributions";

const GitHubStats = memo(function GitHubStats() {

    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleToggle = useCallback((id: number) => {
        // If clicking the already-open card, close it. Otherwise open the clicked one.
        setExpandedId(prev => prev === id ? null : id);
    }, []);

    return (
        <div className={cn(
            "flex justify-center font-mono",
            "relative after:content-[''] after:absolute after:h-px after:w-screen after:pointer-events-none after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:bg-border after:z-50",
        )}>
            {/* <HeroLayoutGuides /> */}
            <div className="relative flex flex-1 max-w-4xl w-full px-4 mb-4">
                <div className="w-full flex flex-col">
                    <div className={cn(
                        "w-full flex flex-col gap-5 pb-5",
                        "relative after:content-[''] after:absolute after:h-px after:w-screen after:pointer-events-none after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:bg-border after:z-50",
                        // "before:content-[''] before:pointer-events-none before:absolute before:left-1/2 before:top-2 before:z-50 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border"
                    )}>
                        <div className="pt-10">
                            <header className="flex flex-row justify-between items-end gap-8 px-0 w-full">
                                <div>
                                    <div className="flex whitespace-nowrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                        <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
                                        Status: Tracking
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                                        Code_<br />Metrics
                                    </h1>
                                </div>
                                <div className="hidden min-[365px]:block text-right text-xs text-muted-foreground space-y-1 font-mono">
                                    <p>ID: GIT-001</p>
                                </div>
                            </header>
                        </div>
                        <div className={cn(
                            "w-full h-full",
                            "relative before:content-[''] before:pointer-events-none before:absolute before:left-1/2 before:-top-1 before:z-50 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border",
                            "after:content-[''] after:absolute after:h-px after:w-screen after:pointer-events-none after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:bg-border after:z-50"
                        )}>
                            <GitHubContributionChart />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-5">
                        <div className="pt-5">
                        <div className="w-full flex items-center justify-between my-5">
                            <header className="flex flex-row justify-between items-end gap-8 px-0 w-full">
                                <div>
                                    <div className="flex whitespace-nowrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                        <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
                                        Status: Committing
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                                        Commit_<br />Log
                                    </h1>
                                </div>
                                <div className="hidden min-[365px]:block text-right text-xs text-muted-foreground space-y-1 font-mono">
                                    <p>ID: LOG-001</p>
                                </div>
                            </header>
                            {/* <div className="flex items-center gap-2">
                                <a href=""><Link className="size-4"/></a>
                            </div> */}
                        </div>
                            <div className={cn(
                                "flex gap-2 text-sm py-px text-text/40",
                                "relative before:content-[''] before:pointer-events-none before:absolute before:left-1/2 before:-top-1 before:z-50 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border",
                                "after:content-[''] after:absolute after:h-px after:w-screen after:pointer-events-none after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:bg-border after:z-50"
                            )}>
                                {/* <span className="border-r border-text/40 pr-2">Total PR: 19 </span> */}
                                <span className="flex items-center"><span>Open</span><span>:3</span></span>
                                <span className="flex items-center"><span>Closed</span><span>:7</span></span>
                                <span className="flex items-center"><span>Merged</span><span>:9</span></span>
                            </div>
                            <div className="w-full flex flex-col">
                                <div className="flex flex-col gap-3 mt-5">
                                    {contributions.map((item) => (
                                        <ExpandableCard
                                            key={item.id}
                                            title={item.title}
                                            repo={item.repo}
                                            issue={item.issue}
                                            status={item.status}
                                            description={item.description}
                                            date={item.date}
                                            link={item.link}
                                            isExpanded={expandedId === item.id}
                                            onToggle={() => handleToggle(item.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default GitHubStats;