const fs = require('fs');
const {copyFile } = require('node:fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

fs.rm(newFolder, {recursive: true}, (err) => {
  fs.mkdir(newFolder, {recursive: true}, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Папка успешно создана');
      copyDir();
    }
  });
}); 

async function copyDir(){
  fs.readdir(folder, {withFileTypes: true}, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      const filePath = path.join(__dirname, 'files', file.name);
      const newFilePath = path.join(__dirname, 'files-copy', file.name);
      copyFile(filePath, newFilePath);
      console.log(file);
    })
  });
}