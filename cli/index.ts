#! /usr/bin/env node
import chalk from 'chalk';

import { copyRcFiles } from './copy-rc-files';
import { install } from './install';
import { updatePackage } from './update-package';

async function main() {
  before('Installing dependencies...');
  await install();
  after('Dependencies Installed!');

  before('Updating package.json...');
  await updatePackage();
  after('Updated package.json!');

  before('Copying .rc files...');
  await copyRcFiles();

  after(chalk`{bold Done!} Try running {italic npm run lint} now.`);
  console.log(
    chalk.italic('Note: you may need to delete existing eslint files')
  );
}

const before = (msg: string) => {
  console.log();
  console.log(chalk.grey(msg));
};

const after = (msg: string) => {
  console.log();
  console.log(chalk.green(msg));
};

main();
