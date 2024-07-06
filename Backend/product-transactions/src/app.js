const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('../routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = 'mongodb://localhost:27017/product_transactions';

app.use(bodyParser.json());
app.use('/api', productRoutes);

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
