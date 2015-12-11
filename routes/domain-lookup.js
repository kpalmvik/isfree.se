const router = require('express').Router();

router.get('/*', (req, res, next) => {
  const seFree = require('se-free'),
        domainName = parseDomainFromUrlPath(req.originalUrl),
        domainLookup = seFree(domainName);

  domainLookup.then(
    (domainLookupResult) => {
      res.render('domain-lookup', {
        domain: domainName,
        result: domainLookupResult});
    }
  );
});

function parseDomainFromUrlPath(urlPath) {
  return urlPath.split('/')[1];
}

module.exports = router;
