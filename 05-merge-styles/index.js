const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist/bundle.css');
const writeStream = fs.createWriteStream(projectPath);

async function bundleStyles(){
  fs.readdir(stylesPath, (err, files) => {
    try {
      files.forEach((file) => {
        const filePath = path.join(stylesPath, file);
        const fileName = path.basename(filePath);
        if (path.extname(filePath) === '.css') {
          const readStream = fs.createReadStream(path.join(stylesPath, fileName));
          readStream.on('data', data => { 
            writeStream.write(data);
          });
        }
      })
    } catch (err) {
      console.error(err);
    }
  });
}

bundleStyles();