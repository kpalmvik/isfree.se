import type { FC } from "hono/jsx";

const Layout: FC = ({
  pageTitleSuffix = "Kolla snabbt om en svensk .se-domän är ledig!",
  children,
}) => (
  <html lang="sv-SE">
    <head>
      <meta charSet="UTF-8" />
      <title>isfree.se | {pageTitleSuffix}</title>
    </head>
    <body>{children}</body>
  </html>
);

export default Layout;
