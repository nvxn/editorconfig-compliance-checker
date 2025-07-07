# EditorConfig Compliance Checker

[![Node.js Version](https://img.shields.io/node/v/ts-node.svg?style=flat&color=blue)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg?style=flat)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A lightweight **TypeScript** script to verify `.editorconfig` compliance across your project files, excluding common directories like `node_modules`, `.git`, and `dist`.

---

## Overview

This tool recursively scans your project directory for source files (`.ts`, `.js`, `.json`, `.md`, `.yml`) and checks them for:

- **Trailing whitespace** on any line  
- **Presence of a final newline** at the end of the file

If violations are found, it lists files and lines needing fixes, helping maintain clean and consistent code formatting aligned with `.editorconfig` rules.

---

## Why use this?

- Ensure consistent whitespace and final newline rules without integrating heavy linters or formatters.
- Simple utility for quick project hygiene checks.
- Configured to ignore common directories like `node_modules`, `.git`, and `dist` to improve performance.

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- [`ts-node-dev`](https://github.com/wclr/ts-node-dev) (`tsnd`) for running TypeScript scripts directly with optional hot reload

### Installation

Clone this repository or copy `verifyEditorConfig.ts` into your project.

Install dependencies (if not already installed):

```bash
npm install --save-dev typescript ts-node-dev
```

## Usage

Run the checker script with:

```bash
npx tsnd --transpile-only verifyEditorConfig.ts
```

Or add a convenient npm script in your `package.json`:

```json
"scripts": {
  "check-editorconfig": "tsnd --transpile-only verifyEditorConfig.ts"
}
```

Then run:

```bash
npm run check-editorconfig
```

---

## Example output

```
🔍 Checking files for .editorconfig compliance (excluding node_modules, .git, dist)...
⚠️ Trailing whitespace in src/index.ts at lines: 12, 25
⚠️ Missing final newline in README.md

❌ Some files need fixing according to .editorconfig.
```

If no issues are found:

```
✅ All checked files comply with .editorconfig rules.
```

---

## Customization

* Adjust `EXCLUDED_DIRS` array in the script to exclude other folders.
* Modify file extensions regex in `walkDir()` if you want to check additional file types.
* Extend checks to include other `.editorconfig` rules if needed.

---

## Author

Nahuel [@nahueldotdev](https://github.com/nahueldotdev)

---

## License

MIT © Nahuel

