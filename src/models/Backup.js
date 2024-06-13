const mongoose = require('mongoose');

const BackupSchema = new mongoose.Schema({
  backupType: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Backup', BackupSchema);
