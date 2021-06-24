const router = require('express').Router();
const sequelize = require('../config/connection');
const { Painting, User, Comment} = require('../models');

//displays all of the art work that has been created
router.get('/', (req, res) => {
    Painting.findAll({
        attributes: [
        'id',
        'title',
        'image_url', 
        'description',
        'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'painting_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User, 
                attributes: ['username']
            }
        ]
    })
        .then(dbPaintingData => {
            const posts = dbPaintingData.map(post => post.get({ plain: true }));
            res.render('homepage', {
                posts, 
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


//where a user can create their own artwork. Will have a text box to add a title, and a canvas for painting. 
router.get('/dashboard', (req, res) => {
    Painting.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
        'id',
        'title',
        'image_url',
        'description', 
        'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'painting_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User, 
                attributes: ['username']
            }
        ]
    })
        .then(dbPaintingData => {
            const posts = dbPaintingData.map(post => post.get({ plain: true}));
            res.render('dashboard', {
                posts, 
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    
})

router.get('/canvas', (req, res) => {
    res.render('canvas')
    
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
router.get('/painting/:id', (req, res) => {
    Painting.findOne({
        where: {
            id : req.params.id
        },
        attributes: [
            'id', 
            'title',
            'image_url',
            'description',
            'created_at'        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'painting_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
     .then(dbPaintingData => {
         if (!dbPaintingData) {
             res.status(400).json({ message: 'No painting found with this id'});
             return;
         }
 
         //serialize the data
         const post = dbPaintingData.get({ plain: true });
 
         //pass data to template
         res.render('single-post', { 
           post,
           loggedIn: req.session.loggedIn
         });
     })
     .catch(err => {
         console.log(err);
         res.status(500).json(err);
     });
})




//when a user clicks the name of the person who created a painting, they will be redirected to a page that displays all of that users creations. 
router.get('user/:id', (req, res) => {
    res.render('user-profile')
})


module.exports = router;