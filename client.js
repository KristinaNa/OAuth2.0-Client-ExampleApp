var request = require('request');

request.get({
	uri: 'http://localhost:3000/connect/facebook',
	headers: {
		'user-agent': 'Mozilla/5.0'
	},
	jar: request.jar(),
	json: true
}, function(err, res, body) {
	if (err) {
		console.log('ERROR IS HERE');
	} else {
		console.log(body);
	}
})