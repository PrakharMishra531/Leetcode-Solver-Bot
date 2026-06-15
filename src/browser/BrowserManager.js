import puppeteer from 'puppeteer';
import {CHROME_PROFILE_PATH, GOOGLE_CHROME_EXECUTABLE_PATH} from '../config.js';

class BrowserManager {
  static browser = null;
  static page = null;

  static async init() {
    if (!BrowserManager.browser) {
      const args = ["--start-maximized"];
      if (process.platform !== "win32") {
        args.push("--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage");
      }

      BrowserManager.browser = await puppeteer.launch({
        headless: false,
        executablePath: GOOGLE_CHROME_EXECUTABLE_PATH,
        userDataDir: CHROME_PROFILE_PATH,
        defaultViewport: null,
        args,
      });

      [BrowserManager.page] = await BrowserManager.browser.pages();
    }
  }

  static async getBrowserDetails() {
    if (!BrowserManager.browser || !BrowserManager.page) {
      await BrowserManager.init();
    }
    return {page: BrowserManager.page, browser: BrowserManager.browser};
  }

  static async closeBrowser() {
    if (BrowserManager.browser) {
      await BrowserManager.browser.close();
      BrowserManager.browser = null;
      BrowserManager.page = null;
    }
  }
}

export const getBrowserDetails = async () => BrowserManager.getBrowserDetails();
export const closeBrowser = async () => BrowserManager.closeBrowser();
