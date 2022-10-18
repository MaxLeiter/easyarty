import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
        <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
