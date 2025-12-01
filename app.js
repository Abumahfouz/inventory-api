const express = require('express');
const app = express();

app.use(express.json());

//mount middleware and routes here

app.use('/api/v1/products', require('./routes/productRoutes'));
app.use('/api/v1/reviews', require('./routes/reviewRoutes'));
app.use('/api/v1/users', require('./routes/authRoutes'));
app.use('/api/v2/products', (req, res)=> res.send("Version 2 coming soon!"));


module.exports = app;