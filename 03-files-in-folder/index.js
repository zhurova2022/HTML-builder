const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, (err, data) => {
  if (err){
    console.error(err);
    return;
  }
  data.forEach((file) => {
    const fileName = path.basename(file);
    const extName = path.extname(file);
    fs.stat(path.join(folder, file), (err, res) => {
      if (err){
        console.error(err);
        return;
      }
      if (res.isFile()) 
      console.log(`${fileName.replace(extName, '')} - ${extName.replace('.', '')} - ${Number(res.size / 1024).toFixed(2)} kb`);
    })
  })
  
})
