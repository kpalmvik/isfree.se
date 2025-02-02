import { DateTime } from "luxon";

import Instructions from "../components/Instructions";
import DomainResult from "../components/DomainResult";
import DomainHeading from "../components/DomainHeading";

interface Props {
  domain: string;
  status: Status;
}

const Domain = ({ domain, status }: Props) => {
  const updatedAt = DateTime.now()
    .setZone("Europe/Stockholm")
    .toFormat("yyyy-LL-dd T");

  return (
    <>
      <header>
        <DomainHeading domain={domain} status={status} />
      </header>
      <main>
        <DomainResult domain={domain} status={status} />
      </main>
      <footer className="result-page__usage">
        <h2 className="usage__title">Hur använder jag isfree.se?</h2>
        <Instructions />
        <div className="updated-at">Informationen uppdaterades {updatedAt}</div>
      </footer>
    </>
  );
};

export default Domain;
