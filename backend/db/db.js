const mongoose = require('mongoose');

const connectBD = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
}

module.exports = connectBD;