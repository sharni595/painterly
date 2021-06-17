const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const app = express();

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
