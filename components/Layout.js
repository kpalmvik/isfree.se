import Head from 'flareact/head';

const Layout = ({
  pageTitleSuffix = 'Kolla snabbt om en svensk .se-domän är ledig!',
  children,
}) => (
  <div className="content">
    <Head>
      <title>isfree.se | {pageTitleSuffix}</title>
    </Head>
    {children}
  </div>
);

export default Layout;
