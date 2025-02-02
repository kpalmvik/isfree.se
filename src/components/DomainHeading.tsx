const DomainHeading = ({
  domain,
  status,
}: {
  domain: string;
  status: Status;
}) => {
  if (status === "FREE") {
    return (
      <h1 className="title">
        <span className="url-nolink">{domain}</span> är ledig!
      </h1>
    );
  }

  if (status === "OCCUPIED") {
    return (
      <h1 className="title">
        <span className="url-nolink">{domain}</span> är upptagen!
      </h1>
    );
  }

  return (
    <h1 className="title">
      <span className="url-nolink">{domain}</span> är inte ett giltigt
      domännamn!
    </h1>
  );
};

export default DomainHeading;
