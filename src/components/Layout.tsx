import type { FC } from "hono/jsx";

const Layout: FC = ({
  pageTitleSuffix = "Kolla snabbt om en svensk .se-domän är ledig!",
  noindex = false,
  children,
}) => (
  <html lang="sv-SE">
    <head>
      <meta charSet="UTF-8" />
      <title>isfree.se | {pageTitleSuffix}</title>
      {noindex && <meta name="robots" content="noindex, follow" />}
    </head>
    <body>{children}</body>
  </html>
);

export default Layout;
