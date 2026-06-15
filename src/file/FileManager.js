import {promises as fs} from 'fs';
import {USER_DATA_PATH, SOLVED_PROBLEMS_PATH} from '../config.js';
import Logger from '../utils/Logger.js';

const PROBLEMS_DIR = './data/problems';

class FileManager {
  static async getAllProblemsNames() {
    const fileList = await fs.readdir(PROBLEMS_DIR);
    const files = fileList.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
    Logger.success(`Total Problems found ${files.length}`, files);
    return files;
  }

  static async getProblemDetails(problemName) {
    const file = await fs.readFile(`${PROBLEMS_DIR}/${problemName}.json`, 'utf-8');
    const data = JSON.parse(file);
    const obj = {language: data.language, code: data.code};
    Logger.warn(`[PROBLEM_DETAILS]\t\t:`, obj);
    return obj;
  }

  static async #ensureSolvedProblemSetFile() {
    try {
      await fs.access(SOLVED_PROBLEMS_PATH);
    } catch (_) {
      Logger.warn(`${SOLVED_PROBLEMS_PATH} was not found, created the file.`);
      await fs.mkdir(USER_DATA_PATH, {recursive: true});
      await fs.writeFile(SOLVED_PROBLEMS_PATH, JSON.stringify([]));
    }
  }

  static async getSolvedProblemSet() {
    await this.#ensureSolvedProblemSetFile();
    const data = await fs.readFile(SOLVED_PROBLEMS_PATH, 'utf8');
    return new Set(JSON.parse(data));
  }

  static async setSolvedProblemSet(problemName) {
    const problemSet = await this.getSolvedProblemSet();
    problemSet.add(problemName);
    Logger.success(`[CACHED]\t\t\t:${problemName}`);
    await fs.writeFile(SOLVED_PROBLEMS_PATH, JSON.stringify(Array.from(problemSet)));
  }
}

export default FileManager;
