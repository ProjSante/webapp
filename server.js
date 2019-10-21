const app = require('./app');
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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
