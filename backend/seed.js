const mongoose = require('mongoose');
const Crime = require('./models/Crime');
const User = require('./models/User');
require('dotenv').config({ path: './backend/.env' });

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // Get all users
    const users = await User.find();
    if (users.length === 0) {
      console.log('No users found. Please create users first.');
      return;
    }

    // Get admin user
    const adminUser = users.find(user => user.role === 'admin');
    const regularUsers = users.filter(user => user.role === 'user');

    // Sample crime data
    const sampleCrimes = [
      {
        caseNumber: 'CR-2024-001',
        title: 'Residential Burglary',
        description: 'Break-in at 123 Main Street, valuables stolen including electronics and jewelry.',
        crimeType: 'Burglary',
        location: '123 Main Street, Downtown',
        dateOccurred: new Date('2024-10-15'),
        status: 'Under Investigation',
        severity: 'High',
        suspects: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
        evidence: ['Security footage', 'Fingerprints'],
        assignedOfficers: regularUsers.length > 0 ? [regularUsers[0]._id] : [],
        reportedBy: adminUser ? adminUser._id : users[0]._id
      },
      {
        caseNumber: 'CR-2024-002',
        title: 'Theft of Vehicle',
        description: 'Honda Civic stolen from parking lot. Vehicle was unlocked.',
        crimeType: 'Theft',
        location: 'Central Parking Lot',
        dateOccurred: new Date('2024-10-20'),
        status: 'Open',
        severity: 'Medium',
        suspects: [],
        evidence: ['Witness statements'],
        assignedOfficers: regularUsers.length > 1 ? [regularUsers[1]._id] : [],
        reportedBy: regularUsers.length > 0 ? regularUsers[0]._id : users[0]._id
      },
      {
        caseNumber: 'CR-2024-003',
        title: 'Cyber Fraud',
        description: 'Online banking fraud resulting in $5,000 loss.',
        crimeType: 'Fraud',
        location: 'Online',
        dateOccurred: new Date('2024-10-18'),
        status: 'Closed',
        severity: 'Medium',
        suspects: [{ name: 'Unknown hacker' }],
        evidence: ['Transaction logs', 'IP addresses'],
        assignedOfficers: regularUsers.length > 0 ? [regularUsers[0]._id] : [],
        reportedBy: regularUsers.length > 1 ? regularUsers[1]._id : users[0]._id
      },
      {
        caseNumber: 'CR-2024-004',
        title: 'Assault Incident',
        description: 'Physical altercation at local bar, victim sustained minor injuries.',
        crimeType: 'Assault',
        location: 'Downtown Bar & Grill',
        dateOccurred: new Date('2024-10-22'),
        status: 'Under Investigation',
        severity: 'High',
        suspects: [{ name: 'Suspect A' }, { name: 'Suspect B' }],
        evidence: ['Medical reports', 'Witness testimony'],
        assignedOfficers: regularUsers.length > 1 ? [regularUsers[1]._id] : [],
        reportedBy: adminUser ? adminUser._id : users[0]._id
      },
      {
        caseNumber: 'CR-2024-005',
        title: 'Drug Possession',
        description: 'Small quantity of controlled substances found during traffic stop.',
        crimeType: 'Drug Offense',
        location: 'Highway 101',
        dateOccurred: new Date('2024-10-25'),
        status: 'Open',
        severity: 'Low',
        suspects: [{ name: 'Driver of vehicle' }],
        evidence: ['Drug test results', 'Physical evidence'],
        assignedOfficers: regularUsers.length > 0 ? [regularUsers[0]._id] : [],
        reportedBy: regularUsers.length > 0 ? regularUsers[0]._id : users[0]._id
      }
    ];

    // Clear existing crimes
    await Crime.deleteMany({});
    console.log('Cleared existing crime records');

    // Insert sample crimes
    const createdCrimes = await Crime.insertMany(sampleCrimes);
    console.log(`Created ${createdCrimes.length} sample crime records`);

    console.log('Database seeded successfully!');
    console.log('Sample crimes created:');
    createdCrimes.forEach(crime => {
      console.log(`- ${crime.caseNumber}: ${crime.title}`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seed function
seedDatabase();
