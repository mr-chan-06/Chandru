const mongoose = require('mongoose');

const productTransactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    dateOfSale: Date,
    sold: Boolean
});

module.exports = mongoose.model('ProductTransaction', productTransactionSchema);
