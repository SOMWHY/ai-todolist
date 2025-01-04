import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildPath = path.resolve(__dirname, 'build');
const indexPath = path.join(buildPath, 'index.html');
const notFoundPath = path.join(buildPath, '404.html');

fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  fs.writeFile(notFoundPath, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('404.html file generated successfully!');
  });
});

