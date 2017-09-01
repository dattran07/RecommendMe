'use strict';
const h = require('../helpers');
const passport = require('passport');
const config = require('../config');

module.exports = () => {
	// Chat App
	let routes = {
		'get': {
			'/': (req, res, next) => {
				res.render('login');
			},
			'/signup': (req, res, next) => {
				res.render('signup');
			},
			'/login': (req, res, next) => {
				res.render('login');
			},

			'/home': [h.isAuthenticated, (req, res, next) => {
				res.render('home', {
					user: req.user,
					host: config.host
				});
			}],
			'/rooms': [h.isAuthenticated, (req, res, next) => {
				res.render('rooms', {
					user: req.user,
					host: config.host
				});
			}],
			'/about': [h.isAuthenticated, (req, res, next) => {
				res.render('about', {
					user: req.user,
					host: config.host
				});
			}],
			'/contact': [h.isAuthenticated, (req, res, next) => {
				res.render('contact', {
					user: req.user,
					host: config.host
				});
			}],
			'/chat/:id': [h.isAuthenticated, (req, res, next) => {
				// Find a chatroom with the given id
				// Render it if the id is found
				let getRoom = h.findRoomById(req.app.locals.chatrooms, req.params.id);
				if(getRoom === undefined) {
					return next();
				} else {
					res.render('chatroom', {
						user: req.user,
						host: config.host,
						room: getRoom.room,
						roomID: getRoom.roomID
					});
				}

			}],
			'/auth/facebook': passport.authenticate('facebook'),
			'/auth/facebook/callback': passport.authenticate('facebook', {
				successRedirect: '/home',
				failureRedirect: '/'
			}),
			'/auth/twitter': passport.authenticate('twitter'),
			'/auth/twitter/callback': passport.authenticate('twitter', {
				successRedirect: '/home',
				failureRedirect: '/'
			}),
			'/logout': (req, res, next) => {
				req.logout();
				res.redirect('/');
			}
		},
		'post': {

		},
		'NA': (req, res, next) => {
			res.status(404).sendFile(process.cwd() + '/views/404.htm');
		}
	}
	return h.route(routes);
}
