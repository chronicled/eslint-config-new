import { promises as fsp } from 'fs';
import { join } from 'path';

import { run } from './utils';

export async function install() {
  const deps = await getDependencies(join(__dirname, 'dependencies.json'));
  await run(`npm install --save-dev ${deps}`);
}

const getDependencies = async (fileName: string): Promise<string> => {
  const deps = await fsp.readFile(fileName, 'utf-8').then(JSON.parse);

  return deps.join(' ');
};
