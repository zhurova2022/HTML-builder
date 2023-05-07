const fs = require('fs');
const path = require('path');

const {readdir, mkdir} = require('node:fs/promises');

const dist = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');

const stylesPath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist/style.css');
const writeStream = fs.createWriteStream(projectPath);

const folder = path.join(__dirname, 'assets');
const newFolder = path.join(__dirname, 'project-dist/assets');

async function createFolder(){
  fs.mkdir(dist, {recursive: true}, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Папка успешно создана');
    }
  });
}
createFolder()

async function buildComponents(template, dist){
  let tempHTML = await fs.promises.readFile(template, 'utf-8');
  const matches = tempHTML.matchAll(/{{(.*?)}}/g);
  for (let match of matches) {
    const nameComponent = match[1];
    let fileOfComponent = path.join(components, `${nameComponent}.html`);
    const htmlComponent = await fs.promises.readFile(fileOfComponent, 'utf8');
    tempHTML = tempHTML.replace(match[0], htmlComponent);
  }
  await fs.promises.writeFile(path.join(dist, 'index.html'), tempHTML, 'utf-8');
}

buildComponents(template, dist);

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
  
  async function copyDir(folder, newFolder){
    fs.mkdir(newFolder, {recursive: true}, (err) => {
        if (err) throw err;
    });
    await fs.readdir(folder, {withFileTypes: true}, (err, files) => {
        if (err) {
          throw err;
        }
        files.forEach(async (file) => {
            if (file.isFile()) {
                const assetsFile = path.join(folder, file.name);
                const assetsDistFlle = path.join(newFolder, file.name);
                await fs.promises.copyFile(assetsFile, assetsDistFlle);
            }
            else {
                copyDir(path.join(folder, file.name), path.join(newFolder, file.name));
            }
        })
    });
  }  
  
  copyDir(folder, newFolder);