const Result = ({
  domain,
  status,
}: {
  domain: string;
  status: "FREE" | "OCCUPIED" | "NOT_VALID";
}) => {
  if (status === "FREE") {
    return (
      <>
        <span className="url-nolink">{domain}</span> är ledig!
      </>
    );
  }

  if (status === "OCCUPIED") {
    return (
      <>
        <span className="url-nolink">{domain}</span> är upptagen!
      </>
    );
  }

  return (
    <>
      <span className="url-nolink">{domain}</span> är inte ett giltigt
      domännamn!
    </>
  );
};

export default Result;
