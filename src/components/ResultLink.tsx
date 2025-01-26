const ResultLink = ({ domain }: { domain: string }) => {
  return (
    <a
      href={`http://${domain}/`}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      Gå till {domain}
    </a>
  );
};

export default ResultLink;
