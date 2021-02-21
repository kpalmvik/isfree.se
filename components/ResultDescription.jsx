const description = {
  FREE: 'Den här domänen går att registrera',
  OCCUPIED: 'Den här domänen har redan registrerats',
  NOT_VALID: 'Den här domänen går av någon anledning inte att registrera',
};

const ResultDescription = ({ status }) => <>{description[status]}</>;

export default ResultDescription;
