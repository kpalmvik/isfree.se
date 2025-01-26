const ResultWhois = ({
  status,
  domain,
}: {
  status: "FREE" | "OCCUPIED" | "NOT_VALID";
  domain: string;
}) => {
  if (status !== "OCCUPIED") {
    return null;
  }

  return (
    <a
      href={`https://internetstiftelsen.se/sok-doman/?domain=${encodeURIComponent(
        domain,
      )}`}
    >
      Se vem som registrerat {domain}
    </a>
  );
};

export default ResultWhois;
