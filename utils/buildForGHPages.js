/* eslint-disable no-console */
// This file minimizes the package.json file before it is included in the package to be published.
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

let AppCode = fs.readFileSync(path.join(__dirname, '../src/App.tsx'), {
  encoding: 'utf8',
  flag: 'r',
});

const newAppCode = AppCode.replace('BrowserRouter', 'HashRouter');

fs.writeFileSync(path.join(__dirname, '../src/App.tsx'), newAppCode);

exec(`npm run build:ci`, (err /* , stdout, stderr */) => {
  if (err) {
    // some err occurred
    console.error(`Error building files. ERROR:${err}`);
    process.exitCode = 1;
  } else {
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);

    process.exitCode = 0;
  }
});
