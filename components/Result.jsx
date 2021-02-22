import PropTypes from 'prop-types';

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

Result.propTypes = {
  domainTld: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['FREE', 'OCCUPIED', 'NOT_VALID']).isRequired,
};

export default Result;
