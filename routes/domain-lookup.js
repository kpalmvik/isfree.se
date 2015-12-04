const router = require('express').Router();

/* GET users listing. */
router.get('/*', (req, res, next) => {
  const urlPath = req.originalUrl;
  const domainName = urlPath.split('/')[1];
  res.send('Looking up ' + domainName);
});

module.exports = router;
