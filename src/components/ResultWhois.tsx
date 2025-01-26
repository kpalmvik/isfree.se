const ResultWhois = ({
  status,
  domain,
}: {
  status: Status;
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
