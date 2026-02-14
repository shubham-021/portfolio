'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="size-10 rounded-full border border-border bg-black" />
        )
    }

    const isDark = theme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="group relative size-10 rounded-xl border border-border hover:bg-cards transition-colors bg-background cursor-pointer"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Moon className="absolute inset-0 m-auto size-5 text-foreground" />
            ) : (
                <Sun className="absolute inset-0 m-auto size-5 text-foreground" />
            )}
        </button>
    )
}