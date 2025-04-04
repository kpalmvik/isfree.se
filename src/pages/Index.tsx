import Nyord from "../components/Nyord";
import SearchForm from "../components/SearchForm";

const Index = () => (
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
    <section>
      <h2 className="example__title">
        Kan min AI-assistent använda isfree.se?
      </h2>
      <p className="example__text">Kul att du frågar!</p>
      <p className="example__text">
        Titta på{" "}
        <a href="https://mcp-server.isfree.se">
          isfree.se Model Context Protocol (MCP) server
        </a>{" "}
        för att se hur du kan konfigurera din AI-assistent att kolla upp om en
        svensk .se-domän är ledig.
      </p>
    </section>
  </>
);

export default Index;
