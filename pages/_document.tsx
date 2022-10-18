// _document.tsx

import Document, { Html, Head, Main, NextScript } from "next/document";

const MyDocument = () => {
 const pageTitle = "Hell Let Loose artillery calculator",
        description = "A dead simple calculator for artillery in Hell Let Loose with support for all teams."

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description}></meta>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta property="og:url" content={""} key="ogurl" />
        <meta property="og:site_name" content={pageTitle} key="ogsitename" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      <body>
        <Main />
        <div id="modal" />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
