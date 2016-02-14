const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {title: 'Isfree.se | Kolla snabbt om en svensk .se-domän är ledig!' });
});

module.exports = router;
