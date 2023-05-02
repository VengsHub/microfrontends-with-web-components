const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/zpa-portal-client/runtime.js',
    './dist/zpa-portal-client/polyfills.js',
    './dist/zpa-portal-client/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/zpa-portal.js');
})();
