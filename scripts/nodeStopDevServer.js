import fs from "fs";
import path from "path";

const pidFile = path.join(process.cwd(), "dev-server.pid");

if (fs.existsSync(pidFile)) {
  const pid = parseInt(fs.readFileSync(pidFile, "utf8"), 10);

  try {
    process.kill(pid);
    console.log(`Dev server (PID: ${pid}) has been killed.`);

    fs.unlinkSync(pidFile);
  } catch (error) {
    console.error("Error killing the dev server process:", error);
  }
} else {
  console.log("Dev server PID file not found.");
}
