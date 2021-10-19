/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'))
);

const { version } = packageJson;
const readMe = fs.readFileSync(path.join(__dirname, '../README.md'));

let newReadMe = readMe.toString().split('\n');
newReadMe[newReadMe.length - 1] = `Based on template version ${version}`;

newReadMe = newReadMe.join('\n');

fs.writeFileSync(path.join(__dirname, '../README.md'), newReadMe);

process.exitCode = 0;
