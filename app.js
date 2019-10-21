const express = require('express');

// Services
const app = express();

// Middlewares
app.use(express.json());

// Routes
/** For testing purposes */
app.get('/', (req, res) => res.send('API working').status(200));
/** Main API routes */
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/patients', require('./routes/api/patients'));
app.use('/api/relays', require('./routes/api/relays'));

module.exports = app;
