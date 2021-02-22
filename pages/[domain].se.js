import seFree from 'se-free';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Instructions from '../components/Instructions';
import Result from '../components/Result';
import ResultDescription from '../components/ResultDescription';

const allowIndexing = ['example.se', 'isfree.se', 'ledig-doman.se', '🦄.se'];

export async function getEdgeProps({ params }) {
  const { domain } = params;
  const uriDecodedDomain = decodeURI(domain);
  const domainTld = `${uriDecodedDomain}.se`;
  const noindex = !allowIndexing.includes(domainTld);
  const status = await seFree(domainTld);

  return {
    props: {
      domainTld,
      status,
      noindex,
    },
    revalidate: 60, // Revalidate these props once every 60 seconds
  };
}

const DomainDotSePage = ({ domainTld, status, noindex }) => (
  <Layout pageTitleSuffix={`Är domänen ${domainTld} ledig?`} noindex={noindex}>
    <header>
      <h1 className="title">
        <Result domainTld={domainTld} status={status} />
      </h1>
      <h2 className="result-page__description">
        <ResultDescription status={status} />
      </h2>
    </header>
    <footer className="result-page__usage">
      <h3 className="usage__title">Hur använder jag isfree.se?</h3>
      <Instructions />
    </footer>
  </Layout>
);

DomainDotSePage.propTypes = {
  domainTld: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['FREE', 'OCCUPIED', 'NOT_VALID']).isRequired,
  noindex: PropTypes.bool.isRequired,
};

export default DomainDotSePage;
