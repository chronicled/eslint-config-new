import chalk from 'chalk';
import { promises as fsp } from 'fs';
import { join } from 'path';

export const copyRcFiles = async () => {
  const rcFiles = ['prettierrc', 'eslintrc', 'eslintignore'];

  console.log(chalk.white('Copying: '), chalk.italic(rcFiles.join(', ')));
  return Promise.all(rcFiles.map(copyRc));
};

async function copyRc(rc: string): Promise<void> {
  const template = join(__dirname, `${rc}.template`);
  const out = `.${rc}`;
  return fsp.copyFile(template, out);
}
