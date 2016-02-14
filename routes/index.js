const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {title: 'Isfree.se | Snabbkoll på lediga svenska .se-domäner' });
});

module.exports = router;
