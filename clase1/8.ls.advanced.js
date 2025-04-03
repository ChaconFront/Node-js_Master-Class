const fs = require('node:fs/promises');
const path= require('node:path');
const pc = require('picocolors');


const folder = process.argv[2] ?? '.';


async function ls(folder) {
  let files;
  try {
     files = await fs.readdir(folder);
  } catch (error) {
    console.error(pc.red(`No se pudo leer el directorio ${folder}`));
    process.exit(1);
  }

  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats =  fs.stat(filePath); // nos devuelve un objeto con la infomacion del archivo
    } catch (error) {
      console.log(`No se pudo leer el archivo ${filePath}`);
      process.exit(1);
    }
    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? 'Directorio' : '-';
    const fileSize = stats.size;
    const fileModified = stats.mtime.toLoacleString();

    return `${fileType} ${file.padEnd()} ${fileSize.toString()} ${fileModified}`;
  });

   fileInfo= await Promise.all(filePromises);
}

ls(folder);
