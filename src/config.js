import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

dotenv.config({path: join(ROOT_DIR, '.env')});

const defaultChromePath = process.platform === 'win32'
  ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  : '/usr/bin/chromium-browser';

export const GOOGLE_CHROME_EXECUTABLE_PATH = process.env.GOOGLE_CHROME_EXECUTABLE_PATH || defaultChromePath;
export const USER_EMAIL = process.env.USER_EMAIL || 'temp@temp.com';
export const CHROME_PROFILE_PATH = join(ROOT_DIR, `./UserData/${USER_EMAIL}/ProfileData`);
export const USER_DATA_PATH = join(ROOT_DIR, `./UserData/${USER_EMAIL}/LeetcoderData`);
export const SOLVED_PROBLEMS_PATH = join(USER_DATA_PATH, 'SolvedProblems.json');
