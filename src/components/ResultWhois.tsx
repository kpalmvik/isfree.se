const ResultWhois = ({ domain }: { domain: string }) => {
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
