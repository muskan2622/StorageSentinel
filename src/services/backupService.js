const { exec } = require('child_process');
const s3Service = require('./s3Servicde');

exports.performBackup = () => {
  return new Promise((resolve, reject) => {
    exec('rsync -av --delete /home/muskan/Desktop/test /local/backup/directory/', (err, stdout, stderr) => {
      if (err) {
        return reject(`Error during backup: ${stderr}`);
      }
      s3Service.uploadToS3('/local/backup/directory/')
        .then(() => resolve('Backup completed successfully'))
        .catch(reject);
    });
  });
};

const cron = require('node-cron');
const { performBackup } = require('./backupService');

// Schedule daily backups at 2 AM
cron.schedule('0 2 * * *', () => {
  performBackup()
    .then(result => console.log(result))
    .catch(err => console.error(err));
});
