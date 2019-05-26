import { Router } from 'express';
import seFree from 'se-free';

const parseDomainFromUrlPath = urlPath => decodeURIComponent(
  // Everything after "isfree.se/" is considered as the domain
  urlPath.substring(1),
);
const endsWithDotSe = str => (str.substring(str.length - 3) === '.se');

const router = Router();

router.get('/*', (req, res, next) => {
  const domainName = parseDomainFromUrlPath(req.originalUrl);

  if (!endsWithDotSe(domainName)) {
    return res.redirect(301, `/${domainName}.se`);
  }

  return seFree(domainName)
    .then((domainLookupResult) => {
      res.render('domain-lookup', {
        domain: domainName,
        result: domainLookupResult,
      });
    });
});

export default router;
