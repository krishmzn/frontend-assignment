import bgimg from "../../public/img/bg.jpg";

export default function Intro() {
  return (
    <>
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgimg.src})` }}
      >
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right text-slate-800">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Ric Owens
              <strong className="block font-extrabold text-orange-700">
                Sunflower Sweats.
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Your perfect pack for everyday use and walks in the forest. Stash your laptop
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center px-4">
              <a
                href="/search"
                className="block w-full rounded bg-orange-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-orange-700 focus:outline-none focus:ring active:bg-orange-500 sm:w-auto"
              >
                Search Products
              </a>

              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-orange-600 shadow hover:text-orange-700 focus:outline-none focus:ring active:text-orange-500 sm:w-auto"
              >
                My Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
