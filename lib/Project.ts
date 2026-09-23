const GITHUB_URL = "https://github.com/shubham-021";

const Project = [
    {
        id: 0,
        title: ["O", "nce"],
        color: "text-once",
        bg: "bg-once/60",
        // hover: "group-hover:bg-once/5",
        button: "border border-once",
        stack: ["Next.js", "TypeScript", "Hono", "Tailwind", "Better-Auth", "Zod", "Qdrant", "Neo4j", "OpenAI SDK", "DODO", "Drizzle", "Bun"],
        description: [
            "Once is an AI-powered, RPG-style story writing app where you can create the stories you've always imagined.",
            "Most of us already have the vision — the plot, the world, the vibe, but don't know where to start or how to build the story properly. Once helps by tracking your character's location, health, energy, traits, inventory, etc., so you can focus on writing instead of managing chaos.",
            "Once is not a make me a story app, it's your co-writer. You provide the plot, the world description, and the protagonist you have in mind, and Once helps make them come alive.",
            "You can also provide your own cast list, starting scene, and specific prompts as special requests for Once.",
            // "After creating the story, you get an editor interface where each scene is saved as a draft, you can edit it manually, request AI changes, or do both."
        ],
        source: `${GITHUB_URL}/once`
    },
    {
        id: 1,
        title: ["R", "elay"],
        color: "text-foreground",
        bg: "bg-foreground/60",
        button: "border border-foreground",
        stack: ["Next.js", "React 19", "TypeScript", "Bun", "SQLite", "Tailwind", "Zustand", "Cheerio", "MPV"],
        description: [
            "Relay is a private media streaming hub that unifies multiple TorBox debrid accounts into a single, seamless streaming catalog.",
            "It automatically indexes files across all connected accounts, parses dirty scene release names, and queries TMDB to organize raw torrents into a structured Netflix-style media library.",
            "Bypasses browser codec limitations through a lightweight local companion daemon (relay-aemond), streaming directly to native players like MPV or VLC with hardware-accelerated 4K HDR playback and watch progress sync.",
            "Features a built-in search aggregator querying 10+ torrent indexes simultaneously with instant debrid cache availability detection, allowing one-click cloud caching and playback."
        ],
        source: `${GITHUB_URL}/relay`
    },
    {
        id: 2,
        title: ["D", "ailylog"],
        color: "text-foreground",
        bg: "bg-foreground/60",
        // hover: "group-hover:bg-foreground/5",
        button: "border border-foreground",
        stack: ["Next.js", "TypeScript", "Hono", "AI-SDK", "Drizzle", "Bun"],
        description: [
            "DailyLog stores news articles' headlines, links, and publish dates from different sources — so you don't have to open ten tabs and jump through multiple pages just to find a specific news article from some random date.",
            "You can read and save articles for a particular day, or simply select a date range to browse all the news published during that period.",
            "Articles are neatly organized by provider, so navigating through your favourite organisation feels effortless. You can also explore articles by categories within each organisation (depending on what categories that provider supports).",
            "And when you don't feel like reading the full thing, you can get an AI summary — or even chat with AI over any article you want."
        ],
        source: `${GITHUB_URL}/dailyLog-v2`
    },
    {
        id: 3,
        title: ["G", "loo"],
        color: "text-gloo",
        bg: "bg-gloo/60",
        // hover: "group-hover:bg-gloo/8",
        button: "border border-gloo",
        stack: ["Node.js", "TypeScript", "Zod", "Commander", "Ink"],
        description: [
            "Gloo is your AI-powered terminal companion that brings intelligent assistance right to your command line.",
            "It's your development co-pilot. You can ask questions, get code help, analyze files, search the web, and even let it handle complex tasks with specialized tools. It remembers your conversations and adapts to different modes whether you're chatting, planning, or building.",
            "With support for multiple AI providers and tools like file analysis, web search, and code parsing, Gloo handles the context switching so you can stay focused on what matters.",
            "After setting it up once, Gloo becomes a natural part of your terminal workflow, ready to help with everything from debugging code to brainstorming ideas, all without leaving your command line."
        ],
        source: `${GITHUB_URL}/gloo`
    }
];

export default Project;
