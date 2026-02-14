'use client'
import { motion } from "motion/react";
import { ChevronsUpDown, GitMergeIcon, GitPullRequestArrowIcon, GitPullRequestClosedIcon, Link } from "lucide-react";
import { cn } from "@/lib/utils";
import { memo } from "react";

type ExpandableCardProps = {
    title: string;
    issue: string;
    repo: string;
    status: string;
    description: string;
    date: string;
    link: string;
    isExpanded: boolean;
    onToggle: () => void;
};

export const ExpandableCard = memo(function ExpandableCards({ title, issue, repo, status, description, date, link, isExpanded, onToggle }: ExpandableCardProps) {
    return (
        <motion.div
            className={cn(
                "bg-[var(--cards)]/40 rounded-lg overflow-hidden",
            )}
            initial={false}
        >
            <div
                className="flex justify-between items-start gap-3 px-3 py-3 cursor-pointer"
                onClick={onToggle}
            >
                <div className="flex gap-2 items-start flex-1 min-w-0">
                    <div className="shrink-0 mt-0.5">
                        {(status === "closed") && <GitPullRequestClosedIcon className="size-4 text-red-500" />}
                        {(status === "merged") && <GitMergeIcon className="size-4 text-purple-500" />}
                        {(status === "open") && <GitPullRequestArrowIcon className="size-4 text-lime-500" />}
                    </div>

                    <span className="text-sm flex-1 min-w-0">
                        {title} <span className="text-gray-500">{issue}</span>
                        <span className="ml-2 inline-flex h-[25px] px-2 text-xs items-center justify-center rounded-full border border-border align-middle">
                            {repo}
                        </span>
                    </span>
                </div>

                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronsUpDown className="size-4 text-text" />
                </motion.div>
            </div>

            <motion.div
                initial={false}
                animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                }}
                className="overflow-hidden"
            >
                <div className="px-3 pb-3 pt-2 border-t border-neutral-600">
                    <div className="text-sm text-text">
                        {description}
                    </div>
                    <div className="text-xs text-text mt-2 flex items-center gap-2">
                        <span>{date}</span>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <Link className="size-3" />
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.title === nextProps.title &&
        prevProps.issue === nextProps.issue &&
        prevProps.repo === nextProps.repo &&
        prevProps.status === nextProps.status &&
        prevProps.description === nextProps.description &&
        prevProps.date === nextProps.date &&
        prevProps.link === nextProps.link &&
        prevProps.isExpanded === nextProps.isExpanded
    );
});