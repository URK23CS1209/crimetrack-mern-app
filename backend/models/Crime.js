const mongoose = require('mongoose');

const CrimeSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  crimeType: {
    type: String,
    required: true,
    enum: ['Theft', 'Assault', 'Fraud', 'Burglary', 'Homicide', 'Cybercrime', 'Drug Offense', 'Vandalism', 'Other']
  },
  location: {
    type: String,
    required: true
  },
  dateOccurred: {
    type: Date,
    required: true
  },
  dateReported: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Open', 'Under Investigation', 'Closed', 'Suspended'],
    default: 'Open'
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  suspects: [{
    name: String,
    description: String,
    status: String
  }],
  evidence: [{
    type: String,
    description: String,
    collectedDate: Date
  }],
  assignedOfficers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Crime', CrimeSchema);