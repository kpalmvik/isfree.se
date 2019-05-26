const router = require('express').Router();

router.get('/*', (req, res, next) => {
  const seFree = require('se-free'),
        domainName = parseDomainFromUrlPath(req.originalUrl);

  if(!endsWithSe(domainName)) {
    return res.redirect(301, '/' + domainName + '.se');
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
  // Everything after "isfree.se/" is considered as the domain
  const URIEncodedDomainName = urlPath.substring(1);
  return decodeURIComponent(URIEncodedDomainName);
}

function endsWithSe(domainName) {
  return (domainName.substring(domainName.length - 3) === '.se');
}

module.exports = router;
