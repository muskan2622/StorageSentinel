const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const backupDir = '/mnt/backup_drive';  


const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
const backupDirTimestamped = path.join(backupDir, `backup_${timestamp}`);


try {
  fs.mkdirSync(backupDirTimestamped, { recursive: true });
  console.log(`Created backup directory: ${backupDirTimestamped}`);
} catch (err) {
  console.error(`Error creating backup directory: ${err}`);
  process.exit(1);
}


function executeBackupCommand(command, dbName, dbType) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error backing up ${dbType} ${dbName}: ${stderr}`);
        reject(error);
      } else {
        console.log(`Backup completed for ${dbType} ${dbName}`);
        resolve(stdout);
      }
    });
  });
}


const mysqlDumpCommand = `mysqldump -u <username> -p<password> --all-databases > ${path.join(backupDirTimestamped, 'mysql_backup.sql')}`;
executeBackupCommand(mysqlDumpCommand, 'MySQL/MariaDB/Percona', 'MySQL')
  .catch(err => console.error(err));

const pgDumpCommand = `pg_dumpall -U <username> -f ${path.join(backupDirTimestamped, 'postgres_backup.sql')}`;
executeBackupCommand(pgDumpCommand, 'PostgreSQL', 'PostgreSQL')
  .catch(err => console.error(err));

const mongoDumpCommand = `mongodump --username <username> --password <password> --out ${path.join(backupDirTimestamped, 'mongodb_backup')}`;
executeBackupCommand(mongoDumpCommand, 'MongoDB', 'MongoDB')
  .catch(err => console.error(err));


const redisSaveCommand = `redis-cli SAVE`;
executeBackupCommand(redisSaveCommand, 'Redis', 'Redis')
  .catch(err => console.error(err));
