<!--
Guidance for AI coding assistants working on this repository.
Keep this short, actionable, and specific to the codebase.
-->

# Copilot / AI assistant instructions (concise)

This repository contains small, independent React + Vite example projects under the top-level folders `part1/`, `part2/`, etc. Each `partN/` is a self-contained Vite + React app with its own `package.json` and ESLint config.

Key facts to be aware of:

- Projects: `part1/` and `part2/` are Vite React projects. Each has scripts in its `package.json`: `dev`, `build`, `preview`, and `lint` (run via `npm run <script>` from that part's directory).
- Source layout: components live in `partX/src/components/`. Files use `.jsx` and default exports for components (e.g. `Header.jsx`, `Content.jsx`, `Part.jsx`, `Note.jsx`).
- Entry points: `partX/src/main.jsx` mounts the app; `partX/src/App.jsx` is the top-level component.
- ESLint: each part has `eslint.config.js`. Note the rule override: `no-unused-vars` uses `varsIgnorePattern: '^[A-Z_]'` — variables starting with uppercase or underscore-like patterns may be intentionally ignored.

Examples and patterns to follow when editing or adding code:

- Props / data flow: top-level `main.jsx` constructs data and passes it into `App`. Example: `part2/src/main.jsx` creates a `notes` array and renders `<App notes={notes} />`.
- Component style: prefer small, focused functional components with prop destructuring. Example pattern — `Part.jsx`:

  - `const Part = ({ part }) => ( <p>{part.name} {part.exercises}</p> )` (default export)

- File extensions: keep `.jsx` for files containing JSX. Follow existing naming for component files.

Project-specific gotchas / actionable checks:

- Prop-name mismatch: `part2/src/main.jsx` passes `notes={notes}`, but `part2/src/App.jsx` reads `props.courses`. If you modify props or wire data, check for this inconsistency and either: (A) change `App.jsx` to use `props.notes`, or (B) change the prop name where `App` is invoked. Point out or fix these small mismatches in pull requests.
- Default exports: components use default exports. When creating new components, match that pattern.
- No tests are present in the repo. Don't add test scaffolding unless requested; prefer minimal, low-risk changes.

Developer workflows (how to run and verify changes):

- Start development server for part2 (example):

  - Open a shell, run: `cd part2; npm install` (if dependencies not yet installed)
  - `npm run dev` — opens Vite dev server with HMR

- Build and preview: `npm run build` then `npm run preview` in the partX directory.
- Lint: `npm run lint` in the partX directory. Use the existing ESLint settings; adhere to the `no-unused-vars` override pattern when appropriate.

If you change cross-cutting config (ESLint, Vite):

- Keep edits localized to the relevant `partN/` folder. These projects are independent; avoid merging configs unless explicitly requested.

Typical PR suggestions an AI should make (concrete):

- If you find the prop-name mismatch described above, propose the minimal fix and a short rationale. Example PR text: "Fix prop name mismatch — `main.jsx` passes `notes` but `App.jsx` reads `courses`; change `App.jsx` to use `props.notes` to match the caller." Include the file paths in the PR description.
- When adding a new component, add it to `src/components/`, import it using relative paths, and export default it.

When unsure, prefer tiny, reversible changes and leave a clear commit message explaining the reasoning.

Files to reference when working here:

- `part2/src/App.jsx` — top-level app (watch for prop names)
- `part2/src/main.jsx` — where sample data is created and passed into `App`
- `part2/src/components/*` — component patterns and style
- `part2/package.json` and `part1/package.json` — scripts and dependency targets
- `part2/eslint.config.js` — ESLint patterns and exceptions

If any instruction is unclear or you need repository-level decisions (monorepo vs many independent apps), ask the repo owner before making sweeping changes.

---
Please review this guidance and tell me if you want the file expanded (link templates, PR checklist, or stricter rules) or narrowed.
