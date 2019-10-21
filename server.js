const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const path = require('path');

// DB connection
mongoose
	.connect(keys.mongoURI, {
		useNewUrlParser    : true,
		useUnifiedTopology : true,
		useCreateIndex     : true,
		useFindAndModify   : false
	})
	.then(console.log('Mongo connected'))
	.catch((err) => console.error(err));

// Services
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/patients', require('./routes/api/patients'));
app.use('/api/relays', require('./routes/api/relays'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
