import Calculator from "./components/calculator";
import Footer from "./components/footer";
import Header from "./components/header";
import ThemeSwitch from "./components/theme-switcher";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-between min-w-full min-h-screen px-4 md:px-0">
        <section className="flex items-center justify-center w-full">
          <Header />
        </section>
        <main className="flex flex-col justify-center">
          <section className="flex flex-col items-center justify-center flex-1 text-center">
            <Calculator />
          </section>
        </main>
        <footer className="p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 bg-card">
          <Footer />
        </footer>
      </div>
    </>
  );
}
