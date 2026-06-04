const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch customers' });
  }
});

// Create a customer
router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Name, email, and phone are required' });
  }

  try {
    const newCustomer = await Customer.create({ name, email, phone });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create customer' });
  }
});

// Update a customer
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to update customer' });
  }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to delete customer' });
  }
});

module.exports = router;
