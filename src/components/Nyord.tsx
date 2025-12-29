import { allMostRecentFirst } from "./nyord-data";

const Nyord = () => {
  return (
    <>
      <h2 className="example__title">Nyord</h2>
      <ul className="nyord-years">
        {allMostRecentFirst.map(({ year, link, words }, i) => {
          const previousYear = allMostRecentFirst[i + 1]?.year;
          const nextYear = allMostRecentFirst[i - 1]?.year;

          return (
            <li key={year} className="nyord-year" id={`nyord-${year}`}>
              <div>
                <p className="example__text">
                  Kolla om något av orden från{" "}
                  <a href={link} target="_blank" rel="noopener">
                    nyordslistan&nbsp;{year}
                  </a>{" "}
                  är lediga som domännamn.
                </p>
                <ul className="example__list example__list--columns">
                  {words.map((word) => (
                    <li className="example__list-item" key={word}>
                      <a href={`/${word}`} className="url">
                        {word}.se
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="nyord-nav">
                <>
                  <li>
                    {nextYear && (
                      <a href={`#nyord-${nextYear}`} className="url">
                        ← Nyord från {nextYear}
                      </a>
                    )}
                  </li>

                  <li>
                    {previousYear && (
                      <a href={`#nyord-${previousYear}`} className="url">
                        Nyord från {previousYear} →
                      </a>
                    )}
                  </li>
                </>
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Nyord;
