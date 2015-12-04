const router = require('express').Router();

/* GET users listing. */
router.get('/*', (req, res, next) => {
  const domainName = parseDomainFromUrlPath(req.originalUrl);

  res.send('Looking up ' + domainName);
});

function parseDomainFromUrlPath(urlPath) {
  return urlPath.split('/')[1];
}

module.exports = router;
