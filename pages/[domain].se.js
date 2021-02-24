import seFree from 'se-free';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import Layout from '../components/Layout';
import Instructions from '../components/Instructions';
import Result from '../components/Result';
import ResultDescription from '../components/ResultDescription';
import ResultWhois from '../components/ResultWhois';

const allowIndexing = ['example.se', 'isfree.se', 'ledig-doman.se', '🦄.se'];

const checkDomainStatus = async (domainTld) => {
  return seFree(domainTld);
};

export async function getEdgeProps({ params }) {
  const { domain } = params;
  const uriDecodedDomain = decodeURI(domain);
  const domainTld = `${uriDecodedDomain}.se`;
  const noindex = !allowIndexing.includes(domainTld);
  const status = await checkDomainStatus(domainTld);
  const updatedAt = DateTime.now()
    .setZone('Europe/Stockholm')
    .toFormat('yyyy-LL-dd T');

  return {
    props: {
      domainTld,
      status,
      noindex,
      updatedAt,
    },
    revalidate: 60, // Revalidate these props once every 60 seconds
  };
}

const DomainDotSePage = ({ domainTld, status, noindex, updatedAt }) => (
  <Layout pageTitleSuffix={`Är domänen ${domainTld} ledig?`} noindex={noindex}>
    <header>
      <h1 className="title">
        <Result domainTld={domainTld} status={status} />
      </h1>
      <h2 className="result-page__description">
        <ResultDescription status={status} />
      </h2>
      <ResultWhois status={status} domainTld={domainTld} />
    </header>
    <footer className="result-page__usage">
      <h3 className="usage__title">Hur använder jag isfree.se?</h3>
      <Instructions />
      <div className="updated-at">Informationen uppdaterades {updatedAt}</div>
    </footer>
  </Layout>
);

DomainDotSePage.propTypes = {
  domainTld: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['FREE', 'OCCUPIED', 'NOT_VALID']).isRequired,
  noindex: PropTypes.bool.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default DomainDotSePage;
