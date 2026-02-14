import { cn } from "@/lib/utils";

export default function MergedPullRequest({className}:{className:string}){
    return(
        <svg
            className={cn("w-10 h-10", className)}
            viewBox="0 0 169 197"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M26.0002 24.5C25.6668 62.1667 48.4002 130.6 142 103"
                stroke="currentColor"
                strokeWidth="15"
            />
            <circle cx="26" cy="26" r="25.5" fill="currentColor" stroke="currentColor" />
            <circle cx="143" cy="103" r="25.5" fill="currentColor" stroke="currentColor" />
            <line
                x1="25.9997"
                y1="51.0638"
                x2="24.9358"
                y2="151.068"
                stroke="currentColor"
                strokeWidth="15"
            />
            <circle cx="26" cy="171" r="25.5" fill="currentColor" stroke="currentColor" />
        </svg>
    )
}