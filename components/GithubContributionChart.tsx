'use client';

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState, useRef } from "react";

type ContributionDay = {
    date: string;
    count: number;
    level: number;
};

export default function GitHubContributionChart({ username = "shubham-021" }: { username?: string }) {
    const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
    const [data, setData] = useState<ContributionDay[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const weeks = useMemo(() => organizeIntoWeeks(data), [data]);
    const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

    useEffect(() => {
        async function fetchGitHubData() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub data');
                }

                const result = await response.json();

                const transformedData: ContributionDay[] = result.contributions.map((day: any) => ({
                    date: day.date,
                    count: day.count,
                    level: day.level,
                }));

                setData(transformedData);
            } catch (err) {
                console.error('Error fetching GitHub data:', err);
                setError('Failed to load contribution data');
                setData(generateMockData());
            } finally {
                setIsLoading(false);
            }
        }

        fetchGitHubData();
    }, [username]);

    const handleCellHover = (day: ContributionDay | null, cellElement: HTMLDivElement | null) => {
        if (!day || !cellElement || !gridRef.current) {
            setHoveredDay(null);
            return;
        }

        const gridRect = gridRef.current.getBoundingClientRect();
        const cellRect = cellElement.getBoundingClientRect();

        setHoveredDay({
            day,
            x: cellRect.left - gridRect.left + cellRect.width / 2,
            y: cellRect.top - gridRect.top,
        });
    };

    return (
        <div className="w-full flex overflow-x-auto pb-2">
            {isLoading && (
                <div className="w-full py-12 flex items-center justify-center">
                    <div className="text-xs text-zinc-400 font-mono">Loading contributions...</div>
                </div>
            )}

            {error && !isLoading && data.length === 0 && (
                <div className="w-full py-12 flex items-center justify-center">
                    <div className="text-xs text-zinc-500 font-mono">{error}</div>
                </div>
            )}

            {!isLoading && data.length > 0 && (
                <div className="flex flex-col gap-3 min-w-max mx-auto">
                    {/* Relative grid container for precise tooltip anchoring */}
                    <div ref={gridRef} className="relative flex flex-col pt-1">
                        {/* Month labels */}
                        <div className="relative h-5 select-none pointer-events-none mb-3">
                            {monthLabels.map(({ month, index }) => (
                                <span
                                    key={`${month}-${index}`}
                                    className="absolute text-[11px] font-mono text-zinc-400 dark:text-zinc-500 top-0 leading-none"
                                    style={{ left: `${index * 15}px` }}
                                >
                                    {month}
                                </span>
                            ))}
                        </div>

                        {/* Contribution grid */}
                        <div className="flex gap-0.75">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-0.75">
                                    {week.map((day, dayIndex) => (
                                        <ContributionCell
                                            key={day ? day.date : `empty-${weekIndex}-${dayIndex}`}
                                            day={day}
                                            onHover={handleCellHover}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Tooltip positioned directly above cell within grid coordinates */}
                        {hoveredDay && (
                            <div
                                className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full px-2.5 py-1.5 rounded-lg border border-zinc-700/80 dark:border-zinc-300/80 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 shadow-xl text-[11px] font-mono whitespace-nowrap"
                                style={{
                                    left: `${hoveredDay.x}px`,
                                    top: `${hoveredDay.y - 6}px`,
                                }}
                            >
                                <span className="font-semibold">{hoveredDay.day.count} {hoveredDay.day.count === 1 ? 'contribution' : 'contributions'}</span>
                                <span className="text-zinc-400 dark:text-zinc-600 ml-1.5">
                                    on {formatDate(hoveredDay.day.date)}
                                </span>
                                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 size-2 rotate-45 bg-zinc-900 dark:bg-zinc-100" />
                            </div>
                        )}
                    </div>

                    {/* Footer: Legend & Total Count */}
                    <div className="flex items-center justify-between gap-4 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        <div>
                            <span>{data.reduce((sum, day) => sum + day.count, 0)} contributions in the last year</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px]">
                            <span>Less</span>
                            <div className="flex gap-1 items-center">
                                {[0, 1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        className={cn('size-2.5 rounded-xs', getLevelColor(level))}
                                    />
                                ))}
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ContributionCell({
    day,
    onHover,
}: {
    day: ContributionDay | null;
    onHover: (day: ContributionDay | null, el: HTMLDivElement | null) => void;
}) {
    if (!day) {
        return <div className="size-3" />;
    }

    return (
        <div
            className={cn(
                'size-3 rounded-xs cursor-pointer transition-colors duration-150 hover:ring-1 hover:ring-zinc-400 dark:hover:ring-zinc-200',
                getLevelColor(day.level)
            )}
            onMouseEnter={(e) => onHover(day, e.currentTarget)}
            onMouseLeave={() => onHover(null, null)}
        />
    );
}

function getLevelColor(level: number): string {
    const colors = {
        light: [
            'bg-zinc-200/70 border border-zinc-300/40', // Level 0
            'bg-zinc-300', // Level 1
            'bg-zinc-400', // Level 2
            'bg-zinc-600', // Level 3
            'bg-zinc-900', // Level 4
        ],
        dark: [
            'dark:bg-zinc-900/80 dark:border dark:border-zinc-800/80', // Level 0
            'dark:bg-zinc-800', // Level 1
            'dark:bg-zinc-700', // Level 2
            'dark:bg-zinc-500', // Level 3
            'dark:bg-zinc-200', // Level 4
        ],
    };
    return `${colors.light[level]} ${colors.dark[level]}`;
}

function organizeIntoWeeks(data: ContributionDay[]): (ContributionDay | null)[][] {
    const weeks: (ContributionDay | null)[][] = [];

    if (!data || data.length === 0) {
        return [];
    }

    const firstDate = new Date(data[0].date);
    const firstDay = firstDate.getDay();

    let currentWeek: (ContributionDay | null)[] = new Array(7).fill(null);
    let dayIndex = (firstDay + 6) % 7;

    for (let i = 0; i < dayIndex; i++) currentWeek[i] = null;

    data.forEach((day) => {
        currentWeek[dayIndex] = day;
        dayIndex++;

        if (dayIndex === 7) {
            weeks.push(currentWeek);
            currentWeek = new Array(7).fill(null);
            dayIndex = 0;
        }
    });

    if (dayIndex > 0) {
        weeks.push(currentWeek);
    }

    return weeks;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function getMonthLabels(weeks: (ContributionDay | null)[][]): { month: string; index: number }[] {
    const months: { month: string; index: number }[] = [];
    let lastMonth = -1;
    let isFirstMonth = true;

    weeks.forEach((week, index) => {
        const firstDay = week.find((day) => day !== null);
        if (firstDay) {
            const date = new Date(firstDay.date);
            const month = date.getMonth();

            if (month !== lastMonth && index > 0) {
                if (!isFirstMonth) {
                    months.push({
                        month: date.toLocaleDateString('en-US', { month: 'short' }),
                        index,
                    });
                }
                isFirstMonth = false;
                lastMonth = month;
            }
        }
    });

    return months;
}

function generateMockData(): ContributionDay[] {
    const data: ContributionDay[] = [];
    const today = new Date();

    for (let i = 365; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const count = Math.floor(Math.random() * 15);
        const level = count === 0 ? 0 : Math.min(4, Math.floor(count / 3) + 1);

        data.push({
            date: date.toISOString().split('T')[0],
            count,
            level,
        });
    }

    return data;
}