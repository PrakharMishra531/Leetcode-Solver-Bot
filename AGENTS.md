# AGENTS.md

## What this is
Puppeteer-based bot that auto-submits solutions to LeetCode from a local archive of C++ problems.

## Quick start
1. `npm install`
2. Create `.env` with `USER_EMAIL` and `GOOGLE_CHROME_EXECUTABLE_PATH`
3. `npm start` — TUI will guide you through login and problem count

## Structure
```
src/
├── index.tsx                 # Entry point — renders Ink TUI
├── config.tsx (config.js)    # Environment config from .env
├── tui/
│   ├── App.tsx               # Main app — orchestrates phases
│   └── components/
│       ├── Banner.tsx        # ASCII art + quote
│       ├── LoginPrompt.tsx   # Login instructions
│       ├── ProblemInput.tsx  # Count prompt
│       ├── Progress.tsx      # Live problem feed
│       └── Complete.tsx      # Summary screen
├── browser/
│   └── BrowserManager.js     # Puppeteer singleton
├── api/
│   └── LeetCodeAPI.js        # GraphQL client for problem status
├── core/
│   ├── Authenticator.js      # Login + cookie extraction
│   └── Solver.js             # Language switch, code injection, submit, verdict
├── file/
│   └── FileManager.js        # Read problems/, manage SolvedProblems.json
└── utils/
    ├── Logger.js             # Chalk-based colored output
    └── helpers.js            # sleep()
data/
└── problems/                 # C++ solution JSON files
```

## How solving works
1. GraphQL API checks if problem is already solved or premium — skips those
2. Navigates to `leetcode.com/problems/{slug}`
3. Waits for LeetCode boilerplate to load (avoids race condition)
4. Switches editor language if not C++
5. Injects code via Monaco API with retry + post-injection verification
6. Clicks submit, waits for "Judging..." to appear then disappear
7. Reads verdict from result panel
8. 8s delay between submissions, 15s cooldown every 5 problems

## Platform
- **Linux/WSL2:** Works. Uses Puppeteer's bundled Chrome with `--no-sandbox`.
- **Windows:** Works. Chrome path defaults to Program Files.

## Constraints
- No headless — browser must be visible for login.
- ESM throughout — `import`/`export`, not `require`.
- JSX/TSX — requires `tsx` for transpilation (`node --import tsx/esm`).
