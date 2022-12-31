const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const remoteServer = 'remote_server_ip_or_hostname';
const remoteShare = 'shared_folder_name';
const username = 'your_username';
const password = 'your_password';
const localMountPath = '/mnt/remote_storage';

function mountRemoteShare(callback) {
  const mountCommand = `sudo mount -t cifs //${remoteServer}/${remoteShare} ${localMountPath} -o username=${username},password=${password},uid=$(id -u),gid=$(id -g)`;
  
  exec(mountCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error mounting remote share: ${stderr}`);
      return callback(error);
    }
    console.log(`Remote share mounted at ${localMountPath}`);
    callback(null);
  });
}

function performFileOperations() {
  const filename = 'example.txt';
  const filePath = path.join(localMountPath, filename);
  const fileContent = 'This is a test file created on the remote share.\n';

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
    } else {
      console.log(`File ${filename} created on the remote share.`);
    }
  });
}

mountRemoteShare((error) => {
  if (!error) {
    performFileOperations();
  }
});
