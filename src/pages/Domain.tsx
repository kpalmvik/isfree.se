import { DateTime } from "luxon";

import Instructions from "../components/Instructions";
import Result from "../components/Result";
import ResultDescription from "../components/ResultDescription";
import ResultWhois from "../components/ResultWhois";
import ResultLink from "../components/ResultLink";

const Domain = ({ domain, status }: { domain: string; status: Status }) => {
  const updatedAt = DateTime.now()
    .setZone("Europe/Stockholm")
    .toFormat("yyyy-LL-dd T");

  return (
    <>
      <header>
        <h1 className="title">
          <Result domain={domain} status={status} />
        </h1>
        <p className="result-page__description">
          <ResultDescription status={status} />
        </p>

        {status === "OCCUPIED" && (
          <ul className="result-page__links">
            <li>
              <ResultWhois domain={domain} />
            </li>
            <li>
              <ResultLink domain={domain} />
            </li>
          </ul>
        )}
      </header>
      <footer className="result-page__usage">
        <h2 className="usage__title">Hur använder jag isfree.se?</h2>
        <Instructions />
        <div className="updated-at">Informationen uppdaterades {updatedAt}</div>
      </footer>
    </>
  );
};

export default Domain;
