# eslint-config
Provides a Chronicled specific eslint configuration for TypeScript and JavaScript projects. Additionally, provides a tool for configuring your project with npm scripts to lint and auto-fix as much as possible as well as pre-commit git hooks to ensure lint errors are not committed.

To execute the installer, simply run:
```sh
npx @chronicled/eslint-config
```
in the root of your project and follow the instructions.

## Existing `.eslint*` files
If you have an existing `.eslint`, `.eslintrc`, `.eslint.js` file, this installer will NOT remove it. Thus, ESLint may continue to use that file instead of the new `.eslintrc`. Be sure to clean up your old `.eslint`s

## Skip Commit Hooks
If you need to commit something and the pre-commit hook is stopping you, you can add a `--no-verify` to your git commit to skip all linting hooks, i.e.:
```sh
git commit --no-verify -am "Need to get this out NOW!"
```
