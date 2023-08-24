import chalk from 'chalk';
import { ChildProcess, spawn } from 'child_process';

export async function run(command: string): Promise<void> {
  console.log(chalk.bold(chalk.blue('Running: '), chalk.white(command)));
  console.log();
  const [cmd, ...args] = command.split(' ');
  const c = spawn(cmd, args, {
    stdio: 'inherit'
  });

  return onExit(c);
}

function onExit(childProcess: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess.once('exit', (code: number) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error('Exit with error code: ' + code));
      }
    });
    childProcess.once('error', (err: Error) => {
      reject(err);
    });
  });
}
