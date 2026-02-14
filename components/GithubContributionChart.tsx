'use client'

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";

type ContributionDay = {
    date: string;
    count: number;
    level: number;
}

export default function GitHubContributionChart({ username = "shubham-021" }: { username?: string }) {

    const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
    const [data, setData] = useState<ContributionDay[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

                // Transform API data to our format
                const transformedData: ContributionDay[] = result.contributions.map((day: any) => ({
                    date: day.date,
                    count: day.count,
                    level: day.level, // API returns 0-4 intensity
                }));

                console.log('API Response:', result);
                console.log('Transformed Data (first 5):', transformedData.slice(0, 5));

                setData(transformedData);
            } catch (err) {
                console.error('Error fetching GitHub data:', err);
                setError('Failed to load contribution data');
                // Fall back to mock data
                setData(generateMockData());
            } finally {
                setIsLoading(false);
            }
        }

        fetchGitHubData();
    }, [username]);

    return (
        <div className="w-full h-full flex overflow-x-auto">
            {isLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-sm text-text/60 font-mono">Loading contributions...</div>
                </div>
            )}

            {error && (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-sm text-red-500 font-mono">{error}</div>
                </div>
            )}

            {/* relative before:content-[''] before:pointer-events-none before:absolute before:left-1/2 before:top-0 before:z-50 before:h-px before:w-screen before:-translate-x-1/2 before:bg-[#36392C]" */}

            {!isLoading && !error && data.length > 0 && (
                <div className={cn(
                    "flex flex-col gap-3 min-w-max mx-auto",
                    // "relative before:content-[''] before:pointer-events-none before:absolute before:left-1/2 before:-top-1 before:z-50 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border",
                    // "after:content-[''] after:absolute after:h-px after:w-screen after:pointer-events-none after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:bg-border after:z-50"
                )}>
                    <div className="flex gap-1">
                        {/* Month labels */}
                        <div className="relative h-4 flex-1">
                            {monthLabels.map(({ month, index }) => (
                                <span
                                    key={index}
                                    className="absolute text-xs text-text/60"
                                    style={{ left: `${index * 16}px` }}
                                >
                                    {month}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contribution grid */}
                    <div className={cn(
                        "flex gap-1",
                        // "relative after:content-[''] after:absolute after:h-px after:w-screen after:pointer-events-none after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:bg-border after:z-50"
                    )}>
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1">
                                {week.map((day, dayIndex) => (
                                    <ContributionCell
                                        key={day ? day.date : `empty-${dayIndex}`}
                                        day={day}
                                        onHover={setHoveredDay}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Tooltip */}
                    {hoveredDay && (
                        <div
                            className="fixed z-50 px-3 py-2 text-xs font-mono bg-cards border border-border rounded-md shadow-lg pointer-events-none"
                            style={{
                                left: `${hoveredDay.x}px`,
                                top: `${hoveredDay.y - 60}px`,
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <div className="text-text font-semibold">{hoveredDay.day.count} contributions</div>
                            <div className="text-text/70">{formatDate(hoveredDay.day.date)}</div>
                        </div>
                    )}

                    {/* Legend */}
                    <div className="flex items-center gap-2 text-xs text-text/60">
                        <span>Less</span>
                        <div className="flex gap-1">
                            {[0, 1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                                />
                            ))}
                        </div>
                        <span>More</span>
                    </div>

                    {/* Total count - NOW AT THE BOTTOM */}
                    <div className={cn(
                        "text-sm text-text/70 font-mono",
                        // "relative after:content-[''] after:absolute after:h-px after:w-screen after:pointer-events-none after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:bg-border after:z-50"
                    )}>
                        {data.reduce((sum, day) => sum + day.count, 0)} contributions in the last year
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
    onHover: (data: { day: ContributionDay; x: number; y: number } | null) => void;
}) {
    if (!day) {
        return <div className="w-3 h-3" />;
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onHover({
            day,
            x: rect.left + rect.width / 2,
            y: rect.top,
        });
    };

    return (
        <div
            className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-foreground/50 ${getLevelColor(day.level)}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => onHover(null)}
            title={`${day.count} contributions`}
        />
    );
}

function getLevelColor(level: number): string {
    const colors = {
        light: [
            'bg-[#fef2f2]', // Level 0
            'bg-[#fecaca]', // Level 1
            'bg-[#fca5a7]', // Level 2
            'bg-[#f87171]', // Level 3
            'bg-[#992325]', // Level 4
        ],
        dark: [
            'dark:bg-[#1a1d16]', // Level 0
            'dark:bg-[#2d3324]', // Level 1
            'dark:bg-[#4a5339]', // Level 2
            'dark:bg-[#6b7d4d]', // Level 3
            'dark:bg-[#708E05]', // Level 4
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
        const firstDay = week.find(day => day !== null);
        if (firstDay) {
            const date = new Date(firstDay.date);
            const month = date.getMonth();

            // Only add label if it's a new month and not the first week
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