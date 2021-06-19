const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes/auth.routes');
const models = require('./models/User')
const { get } = require('./controllers/todo.controller');

// the following from tutorial

const Connection = require('mysql2/typings/mysql/lib/Connection');
// this code from tutorial could be handled by
// by above require
const authRoutes = require('./routes/auth-routes');

const app = express();

// code from tutorial setting up express and passport as middleware
// app.use(middleware1);
// function middleware1(req, res, next) {
//   console.log('i am a middleware')
//   next();
// }
// app.get('/', (req, res, next) => {
//   console.log('I am the standard Express function')
//   res.send('<h1>Hello World</h1>');
// });

// app.get('/', middleware1, next);
// end of code from tutorial

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.engine('hbs', exphbs({ extname: 'hbs' })); // setting up express to use handlebars templating engine
app.set('view engine', 'hbs'); // setting up default view engine

app.use(routes);
// this code from tutorial could be duplicate
// app.use('auth', authRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
  });
});

// code from tutorial has to do with sessions has db code for mongoose needs updated for mysql2 
 
const sessionStore = new databaseStore({mongooseConnection: Connection, collection: 'sessions'})
app.use(session({
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // equals 1 day 
  }
}));


// from tutorial gives access to variables set in the .env file
// process.env.VARIABLE_NAME
require('dotenv').config();

app.use(passport.initialize());
app.use(passport.session());
