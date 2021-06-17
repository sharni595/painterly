const router = require('express').Router();

//displays all of the art work that has been created
router.get('/', (req, res) => {
    res.render('homepage')
})


//where a user can create their own artwork. Will have a text box to add a title, and a canvas for painting. 
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
    
})

//login in and sign up forms will go here
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login')
})

//when a painting from the home page is selected, a user is redirected to this page where they will see that single post, as well as all of its comments
router.get('/post/:id', (req, res) => {
    res.render('single-post')
})

//when a user clicks the name of the person who created a painting, they will be redirected to a page that displays all of that users creations. 
router.get('user/:id', (req, res) => {
    res.render('user-profile')
})


module.exports = router;