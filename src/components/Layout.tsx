import type { FC } from "hono/jsx";
import { ReactElement } from "hono/jsx";

export interface Props {
  pageTitlePrefix?: string;
  noindex?: boolean;
  trunkver?: string;
  children?: ReactElement;
}

const metaRobotsContent = (noindex: boolean) => {
  return noindex ? "noindex, follow" : "index, follow";
};

const Layout: FC = ({
  pageTitlePrefix = "Kolla snabbt om en svensk .se-domän är ledig!",
  noindex = false,
  trunkver,
  children,
}: Props) => (
  <html lang="sv-SE">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{pageTitlePrefix} | isfree.se</title>
      <meta name="robots" content={metaRobotsContent(noindex)} />
      <link rel="stylesheet" href="/styles/sanitize.css" />
      <link rel="stylesheet" href="/styles/style.css" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </head>
    <body>
      <div className="content">{children}</div>
      <footer className="footer">
        <h2 className="footer__title">Om isfree.se</h2>
        <p className="footer__text">
          Tjänsten utvecklas, uppdateras och sköts av{" "}
          <a href="https://kristofer.palmvik.se">Kristofer Palmvik</a> bara för
          att det är roligt.
        </p>
        <ul class="footer__details">
          <li>
            <a href="https://github.com/kpalmvik/isfree.se">Källkod</a>
          </li>
          {trunkver && (
            <li>
              <p className="footer__version" data-nosnippet>
                <a href="https://trunkver.org/" target="_blank" rel="noopener">
                  TrunkVer
                </a>{" "}
                <code>{trunkver}</code>
              </p>
            </li>
          )}
        </ul>
      </footer>
    </body>
  </html>
);

export default Layout;
