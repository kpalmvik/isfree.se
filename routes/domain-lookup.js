const router = require('express').Router();

router.get('/*', (req, res, next) => {
  const seFree = require('se-free'),
        domainName = parseDomainFromUrlPath(req.originalUrl);

  if(!endsWithSe(domainName)) {
    res.redirect(301, '/' + domainName + '.se');
  };

  seFree(domainName)
    .then((domainLookupResult) => {
      res.render('domain-lookup', {
        domain: domainName,
        result: domainLookupResult});
    }
  );
});

function parseDomainFromUrlPath(urlPath) {
  return urlPath.split('/')[1];
}

function endsWithSe(domainName) {
  return (domainName.substring(domainName.length - 3) === '.se');
}

module.exports = router;
