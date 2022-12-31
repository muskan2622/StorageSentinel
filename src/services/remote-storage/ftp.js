const { exec } = require('child_process');

const ftpHost = 'ftp.example.com';
const ftpUsername = 'ftp_username';
const ftpPassword = 'ftp_password';
const ftpRemoteDir = '/remote/backup/directory';
const ftpLocalDir = '/local/backup/directory';

const ftpBackupCommand = `lftp -e "mirror --reverse ${ftpRemoteDir} ${ftpLocalDir}; bye" -u ${ftpUsername},${ftpPassword} ${ftpHost}`;

exec(ftpBackupCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing FTP backup: ${stderr}`);
    return;
  }
  console.log('FTP backup completed successfully.');
});
