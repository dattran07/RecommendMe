'use strict';
const express = require('express'),
	path = require('path'),
  chatCat = require('./app'),
  passport = require('passport'),
	nodemailer = require('nodemailer'),
	cors = require('cors'),
	massive = require('massive'),
	config = require('./config'),
	productsCtrl = require('./products_controller')

const app = express();
app.use(cors());

massive(config.massiveConfig).then(dbInstance => {
    app.set('db', dbInstance);
})

app.post('/api/product', productsCtrl.create);
app.get('/api/product/:id', productsCtrl.getOne);
app.get('/api/products', productsCtrl.getAll);
app.put('/api/product/:id/:price', productsCtrl.update);
app.delete('/api/product/:id', productsCtrl.delete);

let transporter = nodemailer.createTransport({
  service: "gmail",
	secure: false,
	port: 25,
  auth: {
    user: 'testnodemailer48@gmail.com',
    pass: #
  },
	tls: {
		rejectUnauthorized: false
	}
});

app.post('/api/email', function(req, res) {
console.log(req.query);
var name = req.query.name;
var email = req.query.email;
var msg = req.query.msg;
  let mailOptions = {
    from: email,
		to: 'testnodemailer48@gmail.com',
		subject: 'Email from ' + name,
		text: msg
  };
	transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      return console.log(error);
    }
  })
	res.status('200').send('sup')
});

app.set('port', process.env.PORT || 3000);
app.set('host', config.host)
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(chatCat.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('morgan')('combined', {
	stream: {
		write: message => {
			// Write to logs
			chatCat.logger.log('info', message);
		}
	}
}));

app.use('/', chatCat.router);

chatCat.ioServer(app).listen(app.get('port'), () => {
	console.log('Server Running on Port: ', app.get('port'));
});
