const { exec } = require('child_process');

const sshHost = 'ssh.example.com';
const sshUsername = 'ssh_username';
const sshKeyPath = '/path/to/ssh/private/key';
const sshRemoteDir = '/remote/backup/directory';
const localBackupDir = '/local/backup/directory';

const sshBackupCommand = `rsync -avz -e "ssh -i ${sshKeyPath}" ${sshUsername}@${sshHost}:${sshRemoteDir} ${localBackupDir}`;

exec(sshBackupCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing SSH backup: ${stderr}`);
    return;
  }
  console.log('SSH backup completed successfully.');
});
