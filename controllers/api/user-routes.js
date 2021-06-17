const { Painting, User, Comment } = require('../../models');
const router = require('express').Router();

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude : ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Painting,
                attributes: ['id', 'title', 'image_url', 'description', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'created_at'],
                include: {
                    model: Painting,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.statusCode(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
    
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {

});

router.post('/logout', (req, res) => {

});


module.exports = router;