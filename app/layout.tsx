import { Metadata } from "next";
import "./globals.css";
import { AnalyticsWrapper } from "./components/analytics";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL('https://easyarty.com'),
  alternates: {
    canonical: '/',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const description =
    "A dead simple calculator for artillery in Hell Let Loose with support for all teams.";
  const pageTitle = "EasyArty - the Hell Let Loose artillery calculator";
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      </head>
      <body className="min-w-full min-h-screen bg-gray-100 dark:bg-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AnalyticsWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
