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
        <div className="pre-title">Är {domain} ledig?</div>
        <DomainHeading domain={domain} status={status} />
      </header>
      <main>
        <DomainResult domain={domain} status={status} />
      </main>
      <footer>
        <Instructions />
        <div className="updated-at">Informationen uppdaterades {updatedAt}</div>
      </footer>
    </>
  );
};

export default Domain;
