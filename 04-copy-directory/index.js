const fs = require('fs');
const {copyFile } = require('node:fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

async function copyDir(){
  fs.mkdir(newFolder, {recursive: true}, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Папка успешно создана');
    }
  });

  fs.readdir(folder, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      const filePath = path.join(__dirname, 'files', file);
      const newFilePath = path.join(__dirname, 'files-copy', file);
      copyFile(filePath, newFilePath);
      console.log(file);
    })
  });
}

copyDir();