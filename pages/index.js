import Layout from '../components/Layout';
import Instructions from '../components/Instructions';

export default function Index() {
  return (
    <Layout>
      <header>
        <h1 className="title">isfree.se</h1>
        <h2 className="instructions">
          <Instructions />
        </h2>
      </header>
      <section className="index-page__example">
        <h3 className="example__title">Andra exempel</h3>
        <ul className="example__list">
          <li className="example__list-item">
            <a href="/aftonbladet.se" className="url">
              aftonbladet.se
            </a>{' '}
            är upptagen
          </li>
          <li className="example__list-item">
            <a href="/extremtledig.se" className="url">
              extremtledig.se
            </a>{' '}
            är förmodligen ledig
          </li>
          <li className="example__list-item">
            <a href="/_,:.se" className="url">
              _,:.se
            </a>{' '}
            är en ogiltig domän
          </li>
        </ul>
      </section>
      <footer className="index-page__about">
        <h3 className="about__title">Om isfree.se</h3>
        <p className="about__text">
          Tjänsten utvecklas, uppdateras och sköts av{' '}
          <a href="https://kristofer.palmvik.se">Kristofer Palmvik</a> bara för
          att det är roligt.
        </p>
        <a
          href="https://github.com/kpalmvik/isfree.se"
          className="about__source-code"
        >
          Källkod
        </a>
      </footer>
    </Layout>
  );
}
