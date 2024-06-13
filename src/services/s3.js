const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const cron = require('node-cron');
require('dotenv').config();

const s3Client = new S3Client({
  region: "eu-north-1",  // Update with your bucket's region
  credentials: {
    accessKeyId:'AKIAXO5HFPLZ5VOHHDGW',
    secretAccessKey:'+Oe4kp18vZCv63KLFII2BgGvMEWgh56W/Caz6C2U',
  },
});

console.log("1. Initializing the script");


const uploadToS3 = async () => {  // Remove the filePath parameter
  const filePath = '/home/muskan/College List.pdf';  // Directly specify the file path
  
  try {
    const fileName = path.basename(filePath);
    const fileStream = fs.createReadStream(filePath);
    console.log("Uploading the file to S3...");

    const params = {
      Bucket: "my-hosted-conte",     
      Key: `backups/${fileName}`,
      Body: fileStream,
    };

    await s3Client.send(new PutObjectCommand(params));
    console.log(`Uploaded ${fileName} to S3`);
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

uploadToS3();

// const performBackup = () => {
//   return new Promise((resolve, reject) => {
//     const sourceFile = '/home/muskan/1111051603282084152474.pdf';  
//     const backupDir = '/local/backup/directory/';

//     console.log("5. Starting backup process");

//     exec(`cp ${sourceFile} ${backupDir}`, (err, stdout, stderr) => {
//       if (err) {
//         console.error(`Error during backup: ${stderr}`);
//         return reject(`Error during backup: ${stderr}`);
//       }

//       console.log("6. Local backup completed");

//       // Upload the file to S3
//       uploadToS3(path.join(backupDir, path.basename(sourceFile)))
//         .then(() => {
//           console.log("7. Backup completed successfully");
//           resolve('Backup completed successfully');
//           console.log("6. Local backup completed");
//         })
//         .catch(reject);
//         console.log("6. Local backup completed");
//     });
//   });
// };

// console.log("8. Scheduling cron job");

// // Schedule daily backups at 2 AM
// cron.schedule('0 2 * * *', () => {
//   console.log("9. Running cron job");
//   performBackup()
//     .then(result => console.log(result))
//     .catch(err => console.error(err));
// });

// console.log("10. Script initialized");
// // Keep the process alive
// process.stdin.resume();
