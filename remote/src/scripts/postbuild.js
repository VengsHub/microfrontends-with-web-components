const fs = require('fs');

const processBuild = () => {
  try {
    fs.readFile('src/scripts/build.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      switch(data.trim()) {
        case 'dev':
          console.log('postBUILD: development');
          return void null;
        case 'prod':
          console.log('postBUILD: production');
          return void null;
          case 'webcomponent':
            // TODO: this is the place to bundle stuff, or maybe even reach out to grunt or webpack or else
          console.log('postBUILD: webcomponent');
          return void null;
        default:
          console.log('postBUILD: default');
          return void null;
      }
    });
    fs.copyFile('package.json','dist/zpa-portal-webcomponent/package.json', (err) => {
        if (err) {
            console.log("Error Found:", err);
        }});
    fs.copyFile('.npmrc','dist/zpa-portal-webcomponent/.npmrc', (err) => {
        if (err) {
            console.log("Error Found:", err);
        }});
  } catch (e) { throw e}
}

processBuild();
