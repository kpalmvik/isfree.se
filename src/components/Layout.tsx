import type { FC } from "hono/jsx";

const Layout: FC = ({
  pageTitleSuffix = "Kolla snabbt om en svensk .se-domän är ledig!",
  noindex = false,
  children,
}) => (
  <html lang="sv-SE">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>isfree.se | {pageTitleSuffix}</title>
      {noindex && <meta name="robots" content="noindex, follow" />}
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
    </body>
  </html>
);

export default Layout;
