import PropTypes from 'prop-types';

const ResultWhois = ({ status, domainTld }) =>
  status === 'OCCUPIED' && (
    <a
      href={`https://internetstiftelsen.se/sok-doman/?domain=${encodeURIComponent(
        domainTld
      )}`}
    >
      Se vem som registrerat {domainTld}
    </a>
  );

ResultWhois.propTypes = {
  status: PropTypes.oneOf(['FREE', 'OCCUPIED', 'NOT_VALID']).isRequired,
  domainTld: PropTypes.string.isRequired,
};

export default ResultWhois;
