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
      'created_at'
      ],
      order: [['created_at', 'DESC']],
      include: [
          {
              model: Comment,
              attributes: ['id', 'text', 'post_id', 'user_id'],
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
    .then(dbPaintingData => res.json(dbPaintingData))
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
      'created_at'
      ],
      order: [['created_at', 'DESC']],
      include: [
          {
              model: Comment,
              attributes: ['id', 'text', 'post_id', 'user_id'],
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
      if (!dbPaintingData){
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


module.exports = router;
