const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    type: String,
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Qualified', 'Converted'],
        default: 'New'
    }
}, {
    timestamps: true
}); 

module.exports = mongoose.model('Lead', leadSchema);