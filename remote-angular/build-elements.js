const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/remote-angular/runtime.js',
    './dist/remote-angular/polyfills.js',
    // TODO why does this example not generate scripts? './dist/remote-angular/scripts.js',
    './dist/remote-angular/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/remote-angular.js');
})();
