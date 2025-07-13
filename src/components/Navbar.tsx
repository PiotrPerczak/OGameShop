import React from "react";
import logo from "../assets/logo.svg";
import lens from "../assets/lens.svg";

const Navbar: React.FC = () => (
  <header className="bg-slate-100">
    <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <a className="block text-teal-600" href="#">
        <span className="sr-only">Home</span>
        <img className="h-12" alt="Logo" src={logo}></img>
      </a>

      <div className="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-md">
            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="#"
              >
                {" "}
                Home{" "}
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="#"
              >
                {" "}
                PC{" "}
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="#"
              >
                {" "}
                PlayStation{" "}
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="#"
              >
                {" "}
                Xbox{" "}
              </a>
            </li>
            <div className="flex ml-36 h-10 w-96 items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                <img className="h-4" alt="Logo" src={lens}></img>
              </div>
              <input
                id="price"
                name="price"
                type="text"
                placeholder="Search game..."
                className="block min-w-0 grow pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />
            </div>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

export default Navbar;
