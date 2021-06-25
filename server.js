const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
  secret: process.env.SECRET,
  cookie: {
    user_id: '',
    username: '',
    loggedIn: false
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
}

const app = express();

app.use(session(sess));

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.engine('hbs', exphbs({ extname: 'hbs' })); // setting up express to use handlebars templating engine
app.set('view engine', 'hbs'); // setting up default view engine

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
  });
});
