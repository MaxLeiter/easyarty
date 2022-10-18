import Calculator from "../components/calculator";
import ThemeSwitch from "../components/theme-switcher";
import Footer from "../components/footer";
import Head from "next/head";
import Header from "../components/header";

export default function Home() {
  return (
    <>
      <Head>
        <title>easyarty - Hell Let Loose artillery calculator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container bg-gray-100 dark:bg-gray-900 min-h-screen min-w-full flex flex-col justify-between">
        <section className="flex items-center justify-center w-full">
          <Header />
        </section>
        <main className="flex flex-col justify-center">
          <section className="flex flex-col items-center justify-center flex-1 px-10 text-center">
            <Calculator />
          </section>
        </main>
        <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
          <Footer />
          <ThemeSwitch />
        </footer>
      </div>
    </>
  );
}
