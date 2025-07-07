import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const EXCLUDED_DIRS = ['node_modules', '.git', 'dist'];

interface CheckResult {
  trailingWhitespaceLines: number[];
  endsWithNewline: boolean;
}

const checkFile = (filePath: string): CheckResult => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    const trailingWhitespaceLines = content
      .split('\n')
      .map((line, idx) => (/\s+$/.test(line) ? idx + 1 : null))
      .filter((line): line is number => line !== null);

    const endsWithNewline = content.endsWith('\n');

    return { trailingWhitespaceLines, endsWithNewline };
  } catch (error: any) {
    console.error(`❌ Error reading file ${filePath}:`, error.message);
    return { trailingWhitespaceLines: [], endsWithNewline: true };
  }
};

const walkDir = (dir: string, filelist: string[] = []): string[] => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.includes(entry.name)) continue;
      walkDir(fullPath, filelist);
    } else if (
      entry.isFile() &&
      /\.(ts|js|json|md|yml)$/.test(entry.name)
    ) {
      filelist.push(fullPath);
    }
  }

  return filelist;
};

const main = (): void => {
  console.log(`🔍 Checking files for .editorconfig compliance (excluding ${EXCLUDED_DIRS.join(', ')})...`);

  const files = walkDir(ROOT_DIR);
  let hasErrors = false;

  for (const file of files) {
    const { trailingWhitespaceLines, endsWithNewline } = checkFile(file);

    if (trailingWhitespaceLines.length > 0) {
      hasErrors = true;
      console.log(`⚠️ Trailing whitespace in ${file} at lines: ${trailingWhitespaceLines.join(', ')}`);
    }

    if (!endsWithNewline) {
      hasErrors = true;
      console.log(`⚠️ Missing final newline in ${file}`);
    }
  }

  if (!hasErrors) {
    console.log('✅ All checked files comply with .editorconfig rules.');
    process.exit(0);
  } else {
    console.log('\n❌ Some files need fixing according to .editorconfig.');
    process.exit(1);
  }
};

main();
