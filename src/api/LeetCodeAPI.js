import Logger from '../utils/Logger.js';

const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';

const PROBLEM_STATUS_QUERY = `
query questionStatus($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionFrontendId
    title
    titleSlug
    difficulty
    isPaidOnly
    status
  }
}`;

class LeetCodeAPI {
  static #cookies = null;
  static #csrfToken = null;

  static async getCookies(page) {
    const cookies = await page.cookies('https://leetcode.com');
    const cookieMap = {};
    for (const c of cookies) {
      cookieMap[c.name] = c.value;
    }
    LeetCodeAPI.#cookies = cookies;
    LeetCodeAPI.#csrfToken = cookieMap['csrftoken'] || '';
    Logger.success(`[AUTH] Extracted ${cookies.length} cookies, csrf: ${LeetCodeAPI.#csrfToken ? 'ok' : 'missing'}`);
    return cookieMap;
  }

  static async #graphql(query, variables = {}) {
    if (!LeetCodeAPI.#cookies) {
      throw new Error('No cookies — call getCookies(page) after login first');
    }

    const cookieStr = LeetCodeAPI.#cookies.map(c => `${c.name}=${c.value}`).join('; ');

    const res = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieStr,
        'x-csrftoken': LeetCodeAPI.#csrfToken,
        'Referer': 'https://leetcode.com/',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({query, variables}),
    });

    if (!res.ok) {
      throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    if (json.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }
    return json.data;
  }

  static async fetchProblemStatus(titleSlug) {
    const data = await LeetCodeAPI.#graphql(PROBLEM_STATUS_QUERY, {titleSlug});
    return data.question;
  }
}

export default LeetCodeAPI;
