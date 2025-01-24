import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFilePath = path.resolve(__dirname, "../.env");

const generateSecretKey = () => crypto.randomBytes(32).toString("hex");

const envContent = `
ACCESS_TOKEN_SECRET_KEY=${generateSecretKey()}
REFRESH_TOKEN_SECRET_KEY=${generateSecretKey()}`.trim();

fs.writeFileSync(envFilePath, envContent);
