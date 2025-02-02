interface Props {
  domain: string;
}

const ResultOccupied = ({ domain }: Props) => (
  <ul className="result-page__links">
    <li>
      <a
        href={`https://internetstiftelsen.se/sok-doman/?domain=${encodeURIComponent(
          domain,
        )}`}
      >
        Se vem som registrerat {domain}
      </a>
    </li>
    <li>
      <a
        href={`http://${domain}/`}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        Gå till {domain}
      </a>
    </li>
  </ul>
);

export default ResultOccupied;
