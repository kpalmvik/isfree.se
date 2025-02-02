import ResultOccupied from "./ResultOccupied";

interface Props {
  domain: string;
  status: Status;
}

const description = {
  FREE: "Den här domänen går att registrera",
  OCCUPIED: "Den här domänen har redan registrerats",
  NOT_VALID: "Den här domänen går av någon anledning inte att registrera",
};

const Result = ({ domain, status }: Props) => (
  <>
    <p className="result-page__description">{description[status]}</p>
    {status === "OCCUPIED" && <ResultOccupied domain={domain} />}
  </>
);

export default Result;
