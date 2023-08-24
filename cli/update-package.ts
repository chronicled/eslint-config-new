import chalk from 'chalk';
import { promises as fsp } from 'fs';
import inquirer from 'inquirer';
import { set, updateAll } from 'shades';

export async function updatePackage() {
  const config = await getUserConfigOptions();
  const pkg = await readPackageJson();
  const newPkg = getNewPackage(pkg, config.pkg);
  await writePackageJson(newPkg);
}

interface UserResponse {
  pkg: Cmd[];
}

type Cmd = 'lint' | 'fix' | 'hook';

const getUserConfigOptions = async (): Promise<UserResponse> =>
  inquirer.prompt({
    type: 'checkbox',
    name: 'pkg',
    message: 'What would you like added to your package.json?',
    choices: [
      {
        value: 'lint',
        name: chalk`{bold lint}: Report all lint errors`,
        checked: true
      },
      {
        value: 'fix',
        name: chalk`{bold lint:fix}: Fix all auto fixable lint errors with Prettier and ESLint, and report the rest`,
        checked: true
      },
      {
        value: 'hook',
        name: 'git pre-commit hook to fix and report lint errors',
        checked: true
      }
    ]
  });

async function readPackageJson(): Promise<object> {
  try {
    await fsp.access('package.json');
    return fsp.readFile('package.json', 'utf-8').then(JSON.parse);
  } catch {
    console.error(
      'No package.json in this directory. Rerun this in the root of your package'
    );
    process.exit(-1);
    throw new Error('unreachable');
  }
}

async function writePackageJson(pkg: object): Promise<void> {
  return fsp.writeFile('package.json', JSON.stringify(pkg, null, 2));
}

type Updaters = {
  [_ in Cmd]: (pkg: object) => object;
};

const updaters: Updaters = {
  hook: updateAll<object>(
    set('lint-staged')({
      '**/*.{js,ts}': 'eslint --ext .js,.ts --fix'
    }),
    set('husky')({
      hooks: {
        'pre-commit': 'pretty-quick --staged && lint-staged'
      }
    })
  ),

  fix: set('scripts', 'lint:fix')(
    'prettier --write "./**/*.{js,ts}"; eslint --ext .js,ts --fix .'
  ),

  lint: set('scripts', 'lint')(
    'eslint --ext .js,ts . && prettier --check "./**/*.{js,ts}"'
  )
};

const getNewPackage = (pkg: object, cmds: Cmd[]) =>
  cmds.reduce((pkg, cmd) => updaters[cmd](pkg), pkg);
