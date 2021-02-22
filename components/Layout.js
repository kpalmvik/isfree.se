import Head from 'flareact/head';
import PropTypes from 'prop-types';

const Layout = ({ pageTitleSuffix, noindex, children }) => (
  <>
    <div className="content">
      <Head>
        <title>{`isfree.se | ${pageTitleSuffix}`}</title>
        {noindex && <meta name="robots" content="noindex, follow" />}
        <script>
          {`
            window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
            ga('create','UA-XXXXX-Y','auto');ga('send','pageview')
          `}
        </script>
        <script
          src="https://www.google-analytics.com/analytics.js"
          async
          defer
        />
      </Head>
      {children}
    </div>
  </>
);

Layout.defaultProps = {
  pageTitleSuffix: 'Kolla snabbt om en svensk .se-domän är ledig!',
  noindex: false,
};

Layout.propTypes = {
  pageTitleSuffix: PropTypes.string,
  noindex: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Layout;
