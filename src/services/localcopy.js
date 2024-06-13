const fs = require('fs');
const path = require('path');

// Directory to backup
const sourceDir = '/home/muskan/test';  // Replace with your source directory path

// Destination directory for backups (local folder on your computer)
const backupDir = '/home/muskan/Desktop';  // Replace with your backup directory path

// Create timestamped directory for each backup
const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
const destinationDir = path.join(backupDir, `backup_${timestamp}`);

// Ensure destination directory exists
try {
  fs.mkdirSync(destinationDir, { recursive: true });
  console.log(`Created backup directory: ${destinationDir}`);
} catch (err) {
  console.error(`Error creating backup directory: ${err}`);
  process.exit(1);
}

// Function to recursively copy files from sourceDir to destinationDir
function copyFiles(sourceDir, destinationDir) {
  fs.readdir(sourceDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading source directory: ${err}`);
      return;
    }

    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file.name);
      const destPath = path.join(destinationDir, file.name);

      if (file.isDirectory()) {
        console.log(`Skipping directory: ${sourcePath}`);
      } else {
        fs.copyFile(sourcePath, destPath, (err) => {
          if (err) {
            console.error(`Error copying file ${file.name}: ${err}`);
          } else {
            console.log(`Copied ${file.name} to ${destinationDir}`);
          }
        });
      }
    });
  });
}

// Perform backup
copyFiles(sourceDir, destinationDir);
