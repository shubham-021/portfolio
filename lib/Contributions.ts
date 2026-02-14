const contributions = [
    {
      id: 1,
      repo: "mem0ai/mem0",
      title: " fix(ts): lazy-load SQLite3 to prevent import time crashes",
      issue: "#3919",
      link: "https://github.com/mem0ai/mem0/pull/3919",
      status: "open",
      description: "Currently the sdk import sqlite3 at module load time, even when users doesn't configure it. This causes the package to fail in environment where sqlite3 native bindings cannot compile.",
      date: "a weeks ago"
    },
    {
      id: 2,
      repo: "vercel/ai",
      title: "feat(ai): add per-step timeout support for streamText",
      issue: "#11615",
      link: "https://github.com/vercel/ai/pull/11615",
      status: "closed",
      description: "Added support for per-step timeout in streamText timeout object , this allows to set timeout for each individual step in a multistep flow",
      date: "3 weeks ago"
    },
    {
      id: 3,
      repo: "vercel/ai",
      title: "fix(ai): throw timeout error when streamText times out",
      issue: "#11595",
      link: "https://github.com/vercel/ai/pull/11595",
      status: "merged",
      description: "When streamText times out before generating any output, it throws a generic NoOutputGeneratedError with the message `No output generated. Check the stream for errors`. It should throw NoOutputGeneratedError with a proper timeout message and cause.",
      date: "3 weeks ago"
    },
    {
      id: 4,
      repo: "vercel/ai",
      title: "add gemini 3 support for file search tool",
      issue: "#11163",
      link: "https://github.com/vercel/ai/pull/11163",
      status: "merged",
      description: "The gemini api file search tool currently doesn't support gemini-3-pro-preview , even though Google's official documentation lists it as a supported model for File Search.",
      date: "3 weeks ago"
    },
    {
        id: 5,
        repo: "vercel/ai",
        title: "docs: add OIDC doc to AI Gateway docs",
        issue: "#11125",
        link: "https://github.com/vercel/ai/pull/11125",
        status: "closed",
        description: "Added OIDC authentication documentation to the `Choosing a Provider` getting started page",
        date: "Dec 12, 2025"
    },
    {
        id: 6,
        repo: "vercel/ai",
        title: " fix(huggingface) : function_call_output conversion to support client-side tool execution",
        issue: "#10790",
        link: "https://github.com/vercel/ai/pull/10790",
        status: "open",
        description: "The @ai-sdk/huggingface provider uses the OpenAI Responses API format, which requires tool results to be sent using function_call_output items. However, the current implementation only handles server-side tools and throws an `unsupported tool messages` warning when encountering client-side tool results (messages with role: 'tool'), causing the tool result to be skipped entirely",
        date: "Dec 2, 2025"
    },
    // {
    //   id: 7,
    //   repo: "vercel/ai",
    //   title: "fix(anthropic): support PDF responses in web_fetch_tool_result schema validation",
    //   issue: "#11027",
    //   link: "https://github.com/vercel/ai/pull/11027",
    //   status: "merged",
    //   description: "Updated the source field validation in both anthropicMessagesResponseSchema and anthropicMessagesChunkSchema that can accept both types , type : `text` or type : `base64`",
    //   date: "Nov 12, 2025"
    // }
];

export default contributions;