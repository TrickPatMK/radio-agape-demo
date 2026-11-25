import { execSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const env = {
  ...process.env,
  GITHUB_PAGES: "true",
};

console.log(
  `Building static export for GitHub Pages (basePath: "${
    env.NEXT_PUBLIC_BASE_PATH ?? "/radio-agape-giap"
  }")...`
);

execSync("npx next build", {
  stdio: "inherit",
  env,
});

const outDir = join(process.cwd(), "out");
if (existsSync(outDir)) {
  writeFileSync(join(outDir, ".nojekyll"), "");
  console.log("Static export ready in ./out (with .nojekyll).");
}
