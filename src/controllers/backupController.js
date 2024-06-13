const backupService = require('../services/s3Servicde');

exports.startBackup = async (req, res) => {
  try {
    const result = await backupService.performBackup();
    res.status(200).json({ message: 'Backup started successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error starting backup', error: error.message });
  }
};
