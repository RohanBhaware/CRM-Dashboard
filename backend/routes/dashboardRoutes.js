const express = require('express');
const router = express.Router();

// Placeholder dashboard route
router.get('/', (req, res) => {
  res.json({ message: 'Dashboard route' });
});

module.exports = router;
