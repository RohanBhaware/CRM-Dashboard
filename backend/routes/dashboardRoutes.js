const express = require('express');
const Customer = require('../models/Customer');
const Lead = require('../models/Lead');
const router = express.Router();

// Dashboard stats route
router.get('/', async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ status: 'Converted' });

    res.json({
      totalCustomers,
      totalLeads,
      convertedLeads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to load dashboard stats' });
  }
});

module.exports = router;
