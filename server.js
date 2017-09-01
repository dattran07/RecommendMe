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

// var smtpTransport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: config.email,
//     pass: config.password
//   }
// });
//
// app.post('/api/email', function(req, res, next) {
// 	smtpTransport.sendMail({
//     from: `${config.email}`,
//     to: 'dattran0724@gmail.com',
//     subject: 'Hello',
//     text: `From: ${req.body.contact.name} at ${req.body.contact.email}. ${req.body.contact.msg}`
//   }, function(error, response) {
//     if (error) {
//       console.log(error);
//       res.sendStatus(204);
//     } else {
//       res.sendStatus(200);
//     }
//     smtpTransport.close();
//   });
// })

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
