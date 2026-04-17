// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for cross-origin requests
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a simple mongoose model
const ExampleSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Example = mongoose.model('Example', ExampleSchema);

// Define routes
app.get('/api/examples', async (req, res) => {
    try {
        const examples = await Example.find();
        res.json(examples);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/examples', async (req, res) => {
    const example = new Example({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const newExample = await example.save();
        res.status(201).json(newExample);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});