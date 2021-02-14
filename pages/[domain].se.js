import seFree from 'se-free';

import Layout from '../components/Layout';
import Instructions from '../components/Instructions';
import Result from '../components/Result';
import ResultDescription from '../components/ResultDescription';

export async function getEdgeProps({ params }) {
  const { domain } = params;
  const domainTld = `${domain}.se`;
  const status = await seFree(domainTld);

  return {
    props: {
      domain,
      domainTld,
      status,
    },
    revalidate: 60, // Revalidate these props once every 60 seconds
  };
}

const DomainDotSePage = ({ domain, domainTld, status }) => (
  <Layout pageTitleSuffix={`Är domänen ${domainTld} ledig?`}>
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

export default DomainDotSePage;
