const express = require('express');
const router = express.Router();
const Crime = require('../models/Crime');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/crimes
// @desc    Get all crimes (admin sees all, users see only their entitled data)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let crimes;
    
    if (req.user.role === 'admin') {
      // Admin can see all crimes
      crimes = await Crime.find()
        .populate('reportedBy', 'name email')
        .sort({ dateReported: -1 });
    } else {
      // Normal users can only see crimes they reported or are assigned to
      crimes = await Crime.find({
        $or: [
          { reportedBy: req.user.id },
          { assignedOfficers: req.user.id }
        ]
      })
        .populate('reportedBy', 'name email')
        .sort({ dateReported: -1 });
    }
    
    res.json(crimes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/crimes/stats/overview
// @desc    Get crime statistics (Admin only)
// @access  Private (Admin only)
router.get('/stats/overview', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  try {
    const totalCrimes = await Crime.countDocuments();
    const openCases = await Crime.countDocuments({ status: 'Open' });
    const underInvestigation = await Crime.countDocuments({ status: 'Under Investigation' });
    const closedCases = await Crime.countDocuments({ status: 'Closed' });
    const totalUsers = await User.countDocuments();
    
    // Get crimes by type
    const crimesByType = await Crime.aggregate([
      { $group: { _id: '$crimeType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get recent crimes
    const recentCrimes = await Crime.find()
      .sort({ dateReported: -1 })
      .limit(5)
      .populate('reportedBy', 'name email');

    res.json({
      totalCrimes,
      openCases,
      underInvestigation,
      closedCases,
      totalUsers,
      crimesByType,
      recentCrimes
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/crimes/:id
// @desc    Get crime by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const crime = await Crime.findById(req.params.id)
      .populate('reportedBy', 'name email')
      .populate('assignedOfficers', 'name email');
    
    if (!crime) {
      return res.status(404).json({ message: 'Crime record not found' });
    }

    // Check if user has access to this crime
    if (req.user.role !== 'admin') {
      const hasAccess = crime.reportedBy._id.toString() === req.user.id ||
                       crime.assignedOfficers.some(officer => officer._id.toString() === req.user.id);
      
      if (!hasAccess) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    res.json(crime);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Crime record not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/crimes
// @desc    Create new crime record
// @access  Private (Admin only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  try {
    const {
      caseNumber,
      title,
      description,
      crimeType,
      location,
      dateOccurred,
      status,
      severity,
      suspects,
      evidence,
      assignedOfficers
    } = req.body;

    // Validate required fields
    if (!caseNumber || !title || !crimeType || !location) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: caseNumber, title, crimeType, location' 
      });
    }

    // Check if case number already exists
    const existingCrime = await Crime.findOne({ caseNumber });
    if (existingCrime) {
      return res.status(400).json({ message: 'Case number already exists' });
    }

    const newCrime = new Crime({
      caseNumber,
      title,
      description,
      crimeType,
      location,
      dateOccurred: dateOccurred || Date.now(),
      dateReported: Date.now(),
      status: status || 'Open',
      severity: severity || 'Medium',
      suspects: suspects || [],
      evidence: evidence || [],
      assignedOfficers: assignedOfficers || [],
      reportedBy: req.user.id
    });

    const crime = await newCrime.save();
    
    // Populate the response
    await crime.populate('reportedBy', 'name email');
    
    res.status(201).json(crime);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/crimes/:id
// @desc    Update crime record
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  try {
    const {
      caseNumber,
      title,
      description,
      crimeType,
      location,
      dateOccurred,
      status,
      severity,
      suspects,
      evidence,
      assignedOfficers
    } = req.body;

    let crime = await Crime.findById(req.params.id);

    if (!crime) {
      return res.status(404).json({ message: 'Crime record not found' });
    }

    // Check if case number is being changed and if it already exists
    if (caseNumber && caseNumber !== crime.caseNumber) {
      const existingCrime = await Crime.findOne({ caseNumber });
      if (existingCrime) {
        return res.status(400).json({ message: 'Case number already exists' });
      }
    }

    // Update fields
    crime.caseNumber = caseNumber || crime.caseNumber;
    crime.title = title || crime.title;
    crime.description = description || crime.description;
    crime.crimeType = crimeType || crime.crimeType;
    crime.location = location || crime.location;
    crime.dateOccurred = dateOccurred || crime.dateOccurred;
    crime.status = status || crime.status;
    crime.severity = severity || crime.severity;
    crime.suspects = suspects !== undefined ? suspects : crime.suspects;
    crime.evidence = evidence !== undefined ? evidence : crime.evidence;
    crime.assignedOfficers = assignedOfficers !== undefined ? assignedOfficers : crime.assignedOfficers;
    crime.lastUpdated = Date.now();

    await crime.save();
    
    // Populate the response
    await crime.populate('reportedBy', 'name email');
    await crime.populate('assignedOfficers', 'name email');

    res.json(crime);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Crime record not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/crimes/:id
// @desc    Delete crime record
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }

  try {
    const crime = await Crime.findById(req.params.id);

    if (!crime) {
      return res.status(404).json({ message: 'Crime record not found' });
    }

    await crime.deleteOne();

    res.json({ message: 'Crime record deleted successfully' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Crime record not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;