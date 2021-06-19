const router = require('express').Router();
const passport = require('passport');
const passwordUtils = require('../lib/passwordUtils');
// const connection = require('database?');
const User = connection.models.User;

// // auth login post routes from tutorial number2
// router.post('/login', (req, res, next) => {
//     res.render('login');
// });

router.post('/login', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: 'login-success'}));


// from documentation
app.post('/login', passport.authenticate('local'),
  function(req, res, next) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

  router.post('/register', (req, res, next) => {
  // next line veries from password documentation and uses Utube verbage
    const saltHash = genpassword(req.body.pw);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      username: req.body.uname,
      hash: hash,
      salt: salt
    });

    newUser.save().then((user) => {
      console.log(user);
    });

    res.redirect('/login');
    // // handle with passport code below to be replaced
    // res.send('logging out');
});

// fron passport documentation Route 
// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

// get routes

router.get('/', (req, res, next) => {
    res.send()
})
 
router.get('/login', (req, res, next) => {
    const form = vvvv
})


// documentation from passport for middleware called Connect
// Connect is a simple framework to glue together various "middleware" to handle requests.
// var connect = require('connect');
// var http = require('http');

// var app = connect();

// // gzip/deflate outgoing responses
// var compression = require('compression');
// app.use(compression());

// // store session state in browser cookie
// var cookieSession = require('cookie-session');
// app.use(cookieSession({
//     keys: ['secret1', 'secret2']
// }));

// // parse urlencoded request bodies into req.body
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));

// // respond to all requests
// app.use(function(req, res){
//   res.end('Hello from Connect!\n');
// });

// //create node.js http server and listen on port
// http.createServer(app).listen(3000);

module.exports = router;