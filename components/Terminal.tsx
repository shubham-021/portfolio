'use client'

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type OutputLine = {
    type: "input" | "output" | "error";
    text: string;
}

type TerminalProps = {
    commands: Record<string, () => string>;
    welcomeMessage?: string;
    prompt?: string;
    className?: string;
}

export default function Terminal({
    commands,
    welcomeMessage = "Welcome to the Terminal\nType 'help' to see available commands.",
    prompt = "user@terminal:~$",
    className
}: TerminalProps) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<OutputLine[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);

    // Auto-focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Auto-scroll to bottom when output changes
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [output]);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();

        // Add command to output
        setOutput(prev => [...prev, {
            type: 'input',
            text: `${prompt} ${cmd}`
        }]);

        // Add to command history
        if (trimmed) {
            setCommandHistory(prev => [...prev, trimmed]);
            setHistoryIndex(-1);
        }

        // Execute command
        if (trimmed in commands) {
            const result = commands[trimmed]();

            if (result === '__CLEAR__') {
                setOutput([]);
            } else {
                setOutput(prev => [...prev, {
                    type: 'output',
                    text: result
                }]);
            }
        } else if (trimmed) {
            setOutput(prev => [...prev, {
                type: 'error',
                text: `Command not found: ${trimmed}\nType 'help' for available commands.`
            }]);
        }

        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "flex flex-col overflow-hidden",
                "bg-[#0a0a0a] border border-border rounded-lg",
                "font-mono",
                className
            )}
        >
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] px-3 py-2 flex items-center gap-3 border-b border-border">
                <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                </div>
                <div className="flex-1 text-center text-[#a0a0a0] text-[13px]">
                    {prompt}
                </div>
            </div>

            {/* Terminal Body */}
            <div
                ref={terminalBodyRef}
                className="p-4 h-full overflow-y-auto cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                {/* Welcome Message */}
                <div className="text-[#888] mb-2 whitespace-pre-wrap">
                    {welcomeMessage}
                </div>
                <br />

                {/* Output History */}
                {output.map((line, i) => (
                    <div
                        key={i}
                        className={cn(
                            "mb-2",
                            line.type === 'input' && "text-[#888]",
                            line.type === 'error' && "text-[#ff5f56]",
                            line.type === 'output' && "text-foreground"
                        )}
                    >
                        <pre className="whitespace-pre-wrap font-mono">{line.text}</pre>
                    </div>
                ))}

                {/* Input Prompt */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-foreground whitespace-nowrap">{prompt}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-white caret-white"
                        spellCheck={false}
                        autoComplete="off"
                    />
                    <motion.span
                        className="text-foreground ml-[-4px]"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "linear"
                        }}
                    >
                        █
                    </motion.span>
                </div>
            </div>
        </motion.div>
    );
}