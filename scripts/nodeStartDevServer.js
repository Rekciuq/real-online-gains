import { exec } from "child_process";
import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const devProcess = exec("npm run dev", {
  detached: true,
  stdio: "ignore",
});

console.log("Dev server is running in the background...");

devProcess.stdout.on("data", (data) => {
  if (data.includes("Local:")) {
    console.log("Dev server is up and running at http://localhost:3000");

    removeUploadsFolder()
      .then(() => {
        console.log("Uploads folder removed.");
        return runResetDb();
      })
      .then(() => {
        console.log("Reset DB completed, killing dev server...");
        devProcess.kill("SIGINT");
      })
      .catch((error) => {
        console.error("Error during reset-db or folder removal:", error);
      });
  }
});

devProcess.on("error", (err) => {
  console.error("Failed to start dev server:", err);
  process.exit(1);
});

function runResetDb() {
  console.log("Starting reset-db...");
  return execPromise("npm run reset-db");
}

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(new Error(stderr));
      }
      resolve(stdout);
    });
  });
}

function removeUploadsFolder() {
  return new Promise((resolve, reject) => {
    fs.rm(UPLOADS_DIR, { recursive: true, force: true }, (err) => {
      if (err) {
        return reject(`Failed to remove uploads directory: ${err}`);
      }
      resolve();
    });
  });
}
