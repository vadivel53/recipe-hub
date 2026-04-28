const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger API Docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/recipes', require('./routes/recipe.routes'));
app.use('/api/planner', require('./routes/planner.routes'));
app.use('/api/users', require('./routes/user.routes'));

// Health check
app.get('/', (req, res) => res.json({ message: 'Recipe Hub API is running 🍴' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
