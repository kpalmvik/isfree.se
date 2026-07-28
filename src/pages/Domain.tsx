import { DateTime } from "luxon";
import DomainHeading from "../components/DomainHeading";
import DomainResult from "../components/DomainResult";
import Instructions from "../components/Instructions";

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
      <main data-nosnippet>
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
