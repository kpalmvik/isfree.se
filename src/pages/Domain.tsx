import Layout from "../components/Layout";

const Domain = ({ domain }: { domain: string }) => (
  <Layout pageTitleSuffix={`Är domänen ${domain} ledig?`}>
    <h1>Looking up {domain}!</h1>
  </Layout>
);

export default Domain;
