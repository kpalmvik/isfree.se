import Nyord from "../components/Nyord";
import SearchForm from "../components/SearchForm";

const Index = ({ trunkver }: { trunkver?: string }) => (
  <>
    <header data-testid="header">
      <h1 className="title">isfree.se</h1>
      <p className="instructions">
        Besök <a href="/example">isfree.se/example</a> för att snabbt se om
        domänen <span className="url-nobreak">example.se</span> är upptagen
        eller ledig.
      </p>
    </header>
    <section className="index-page__search">
      <SearchForm />
    </section>
    <section className="index-page__example">
      <h2 className="example__title">Andra exempel</h2>
      <ul className="example__list">
        <li className="example__list-item">
          <a href="/isfree" className="url">
            isfree.se
          </a>{" "}
          är upptagen
        </li>
        <li className="example__list-item">
          <a href="/ledig-doman" className="url">
            ledig-doman.se
          </a>{" "}
          är förmodligen ledig
        </li>
        <li className="example__list-item">
          <a href="/🦄" className="url">
            🦄.se
          </a>{" "}
          är en ogiltig domän
        </li>
      </ul>
    </section>
    <section className="index-page__nyord">
      <Nyord />
    </section>
    <footer className="index-page__about">
      <h2 className="about__title">Om isfree.se</h2>
      <p className="about__text">
        Tjänsten utvecklas, uppdateras och sköts av{" "}
        <a href="https://kristofer.palmvik.se">Kristofer Palmvik</a> bara för
        att det är roligt.
      </p>
      <a
        href="https://github.com/kpalmvik/isfree.se"
        className="about__source-code"
      >
        Källkod
      </a>
      {trunkver && (
        <p className="about__version" data-nosnippet>
          Version: <code>{trunkver}</code>
        </p>
      )}
    </footer>
  </>
);

export default Index;
