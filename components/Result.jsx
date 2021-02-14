const Result = ({ domainTld, status }) => {
  if (status === 'FREE') {
    return (
      <>
        <span className="url-nolink">{domainTld}</span> är ledig!
      </>
    );
  }

  if (status === 'OCCUPIED') {
    return (
      <>
        <span className="url-nolink">{domainTld}</span> är upptagen!
      </>
    );
  }

  return (
    <>
      <span className="url-nolink">{domainTld}</span> är inte ett giltigt
      domännamn!
    </>
  );
};

export default Result;
