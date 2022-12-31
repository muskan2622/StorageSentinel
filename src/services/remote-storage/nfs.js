const { exec } = require('child_process');
const path = require('path');

const nfsMountDir = '/mnt/nfs_mount';
const nfsServer = 'nfs_server_ip_or_hostname';
const nfsRemoteDir = '/remote/backup/directory';
const nfsLocalDir = '/local/backup/directory';

const mountCommand = `sudo mount -t nfs ${nfsServer}:${nfsRemoteDir} ${nfsMountDir}`;

exec(mountCommand, (mountError, mountStdout, mountStderr) => {
  if (mountError) {
    console.error(`Error mounting NFS: ${mountStderr}`);
    return;
  }
  
  console.log(`NFS mounted at ${nfsMountDir}`);

  const copyCommand = `cp -r ${path.join(nfsMountDir, 'backup')}/* ${nfsLocalDir}`;

  exec(copyCommand, (copyError, copyStdout, copyStderr) => {
    if (copyError) {
      console.error(`Error copying NFS files: ${copyStderr}`);
      return;
    }
    
    console.log('NFS backup completed successfully.');
  });
});
