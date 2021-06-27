const { Painting, User, Comment } = require('../../models');
const router = require('express').Router();


//code needs to be changed to be painting instead of todo.
//will let Kota do the post route?
router.get('/', (req, res) => {
  Painting.findAll({
    attributes: [
      'id',
      'title',
      'image_url',
      'description',
      'user_id',
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
      res.json(dbPaintingData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Painting.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'image_url',
      'description',
      'user_id',
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
      if (!dbPaintingData) {
        res.status(404).json({ message: 'No painting found with this id' });
        return;
      }
      res.json(dbPaintingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.post('/', (req, res) => {
<<<<<<< HEAD
  if (req.session) {

    console.log(`<-------------- ${req.body.title} -------------->`)
=======
  console.log('---hit---');
  console.log(req.body);
>>>>>>> main
    Painting.create({
      title: req.body.title,
      image_url: req.body.image_url,
      description: req.body.description,
<<<<<<< HEAD
      user_id: req.body.user_id
    })
      .then(dbPaintingData => {
        console.log('Hit the Then in server')
        res.json(dbPaintingData)
      })
=======
      user_id: req.session.user_id
    })
      .then(dbPaintingData => {
        console.log('>>>>>>>>>');
        res.json(dbPaintingData)})
>>>>>>> main
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
<<<<<<< HEAD
  }
  else {
    console.log('No Session')
  }
=======
  
>>>>>>> main
})

module.exports = router;
