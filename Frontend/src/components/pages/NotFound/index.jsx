import { Link } from "react-router-dom";
import constants from "../../../../constants";

export default function NotFound() {
  const { logo_pjg } = constants;
  return (
    <>
      {/* component */}
      <main className="h-screen w-full flex flex-col justify-center items-center bg-gray-200">
        <img src={logo_pjg} alt="..." className="w-52 rounded-2xl" />
        <h1 className="text-9xl font-extrabold text-gray-700 tracking-widest">
          404
        </h1>
        <div className="bg-secondary text-gray-700 px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <div className="relative inline-block text-sm font-medium text-secondary group active:text-yellow-400 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-secondary group-hover:translate-y-0 group-hover:translate-x-0" />
            <span className="relative block px-8 py-3 bg-white hover:bg-yellow-400 hover:text-white transition duration-300 border border-current">
              <Link to="/">Beranda</Link>
            </span>
          </div>
        </button>
      </main>
    </>
  );
}
