const fs = require('fs');
const path = require('path');

const { stdout, stdin } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Добрый день. Напишите, пожалуйста, любой текст\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit'){
    exitInfo();
  }
  output.write(data);
});

process.on('SIGINT', exitInfo);

function exitInfo(){
  stdout.write('Удачи!');
  process.exit();
}