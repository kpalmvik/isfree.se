import PropTypes from 'prop-types';

const description = {
  FREE: 'Den här domänen går att registrera',
  OCCUPIED: 'Den här domänen har redan registrerats',
  NOT_VALID: 'Den här domänen går av någon anledning inte att registrera',
};

const ResultDescription = ({ status }) => <>{description[status]}</>;

ResultDescription.propTypes = {
  status: PropTypes.oneOf(Object.keys(description)).isRequired,
};

export default ResultDescription;
