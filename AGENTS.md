# AI Agent Instructions

This file defines the instructions and standards that AI agents must follow in the project.

## Core Standards

### 1. Naming & Style
- Use `camelCase` for functions and variables.
- Use descriptive names (avoid `Data`, `Info`, `Object`).
- Functions: Verbs (e.g., `calculateTotalAdjustedPrice`).
- Variables: Nouns (e.g., `userProfile`).
- Constants: `UPPER_SNAKE_CASE`.

### 2. Logic & Control Flow
- **Mandatory Curly Braces `{}`**: Always use curly braces for `if` statements and all function declarations (e.g., `const`, `function`, etc.). Implicit returns are prohibited.
  - **Bad**: `const formatDate = (param) => new Date(param);`
  - **Good**: `const formatDate = (param) => { return new Date(param); };`
- **Explicit Boolean Values**: Use explicit boolean values in conditions.
- **Null & Undefined Checks**: Use loose equality `== null` to check for both `null` and `undefined` simultaneously.
- **Strict Equality**: Use strict equality `===` for all other comparisons.
- **Prefer Early Returns**: Use early returns over `else` blocks to reduce nesting.
- **Nullish Coalescing**: Use `??` (Nullish Coalescing) by default for default value assignments.

### 3. Functional Programming
- **Single Responsibility**: A function must perform only one role and have a single responsibility.
- Immutability: Do not reassign variables.
- Strictly use `const`, avoid `let`.
- Extract utility logic into separate functions.
- No magic values; use constants.

### 4. TypeScript
- No `as` casting.
- No `any` type.
- Rely on type inference where clear.

### 5. React & React Native
- Component export: `export const ComponentName = ...`.
- No `setState` directly in props; use handler functions.
- Avoid `useEffect`; prefer derived state or event handlers.
- **Separation of Concerns**: Separate Business Logic (hooks, calculations) from Rendering (JSX).
- Pre-calculate values in Business Logic Area.

## Pull Request Rules
- **PR Template Required**: Before creating or updating a Pull Request, open `.github/PULL_REQUEST_TEMPLATE.md` and follow its structure exactly. Do not use an arbitrary title or description format when a repository template exists.

## Documentation Rules
- **Documentation Tone**: When adding or editing project documentation, write in an imperative tone.
- **Prohibited Documentation Style**: Do not use explanatory ending forms such as `-한다`, `-합니다`, `-해야 합니다` in project documentation.

## Workflow & Planning
- **Task Scoping**: Divide your work into single PR (feature) units. Do not mix unrelated features in a single PR.
- **Pre-work Planning**: Before starting any code implementation, you must create a markdown plan file under the `docs/` directory. Use the naming convention `001-[task-name].plan.md` (increment the number sequentially for future plans).