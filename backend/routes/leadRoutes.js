const express = require('express');
const Lead = require('../models/Lead');
const router = express.Router();

// Get all leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch leads' });
  }
});

// Create a lead
router.post('/', async (req, res) => {
  const { customerName, status } = req.body;

  if (!customerName || !status) {
    return res.status(400).json({ message: 'Customer name and status are required' });
  }

  try {
    const newLead = await Lead.create({ customerName, status });
    res.status(201).json(newLead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create lead' });
  }
});

// Update a lead
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { customerName, status } = req.body;

  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { customerName, status },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(updatedLead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to update lead' });
  }
});

// Delete a lead
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: 'Lead deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to delete lead' });
  }
});

module.exports = router;
