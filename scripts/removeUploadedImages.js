import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const uploadsDir = path.join(process.cwd(), "public/uploads");

if (fs.existsSync(uploadsDir)) {
  fs.rmSync(uploadsDir, { recursive: true, force: true });
  console.log("Removed public/uploads directory.");
}

console.log("Recreated public/uploads directory.");

try {
  execSync("npx prisma migrate reset --force", { stdio: "inherit" });
} catch (error) {
  console.error("Error resetting database:", error.message);
  process.exit(1);
}
