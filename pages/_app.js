/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import '../styles/sanitize.css';
import '../styles/style.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
