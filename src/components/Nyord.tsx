import { nyord2022, nyord2023, nyord2024, nyord2025 } from "./nyord-data";

const getRandomItem = <T,>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const Nyord = () => {
  const allNyordYears = [nyord2022, nyord2023, nyord2024, nyord2025];

  const nyord = getRandomItem(allNyordYears);

  return (
    <>
      <h2 className="example__title">Nyord {nyord.year}</h2>
      <p className="example__text">
        Kolla om något av orden från{" "}
        <a href={nyord.link} target="_blank" rel="noopener" className="url">
          nyordslistan&nbsp;{nyord.year}
        </a>{" "}
        är lediga som domännamn.
      </p>
      <ul className="example__list example__list--columns">
        {nyord.words.map((word) => (
          <li className="example__list-item" key={word}>
            <a href={`/${word}`} className="url">
              {word}.se
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Nyord;
