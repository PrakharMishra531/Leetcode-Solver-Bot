import Logger from '../utils/Logger.js';
import {getBrowserDetails} from '../browser/BrowserManager.js';
import LeetCodeAPI from '../api/LeetCodeAPI.js';

const LOGIN_INSTRUCTIONS = `
Please log in using your credentials (You have 10 min).<br>
After successful login, close the browser and start the program again.<br>
<br>
Cloudflare tips:<br>
[1] Type email and password, sign in without interacting with Cloudflare.<br>
[2] Type email and password, click Cloudflare and instantly click sign in.<br>
`;

class Authenticator {
  static async login() {
    Logger.error('<<<< Starting Authenticator >>>>');

    const {page} = await getBrowserDetails();
    await page.goto('https://leetcode.com/accounts/login/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Check if already logged in
    try {
      await page.waitForSelector('#navbar_user_avatar', {visible: true, timeout: 3000});
      Logger.success('User was already logged in.');
      await LeetCodeAPI.getCookies(page);
      Logger.error('<<<< Exiting Authenticator >>>>');
      return;
    } catch (_) {}

    Logger.success('Login using your credentials.');

    // Show login instructions in the page
    await page.evaluate((instructions) => {
      const app = document.getElementById('app');
      if (app) {
        const div = document.createElement('div');
        div.innerHTML = instructions;
        div.style.cssText = 'display:flex;justify-content:center;align-items:center;color:#fcfcfc;padding:2rem;background:#181818;';
        app.insertBefore(div, app.firstChild);
      }
    }, LOGIN_INSTRUCTIONS);

    await page.waitForSelector('#navbar_user_avatar', {visible: true, timeout: 600000});
    Logger.success('Logged in successfully.');
    await LeetCodeAPI.getCookies(page);
    Logger.error('<<<< Exiting Authenticator >>>>');
  }
}

export default Authenticator;
