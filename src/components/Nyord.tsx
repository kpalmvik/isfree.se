import { nyord2024 } from "./nyord-data";

const Nyord = () => (
  <>
    <h2 className="example__title">Nyord 2024</h2>
    <p className="example__text">
      Kolla om något av orden från{" "}
      <a href={nyord2024.link} target="_blank" rel="noopener" className="url">
        nyordslistan&nbsp;2024
      </a>{" "}
      är lediga som domännamn.
    </p>
    <ul className="example__list example__list--columns">
      {nyord2024.words.map((word) => (
        <li className="example__list-item" key={word}>
          <a href={`/${word}`} className="url">
            {word}.se
          </a>
        </li>
      ))}
    </ul>
  </>
);

export default Nyord;
