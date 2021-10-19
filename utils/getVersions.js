/* eslint-disable @typescript-eslint/no-var-requires */
// Creates a version file that can be called

const path = require('path');
const fs = require('fs');

const packagedata = fs.readFileSync('package.json');
const packageJson = JSON.parse(packagedata);

const versions = {
  bootstrap: packageJson.dependencies.bootstrap,
  hello: 'world',
  featureFlags: packageJson.dependencies['feature-flags'],
};

fs.writeFileSync(
  path.join(__dirname, '../public/versions.json'),
  JSON.stringify(versions)
);
