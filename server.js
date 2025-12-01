const connectDB = require('./config/db');
require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});