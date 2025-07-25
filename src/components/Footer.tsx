import React from "react";
import logo from "../assets/logo.svg";

const Footer: React.FC = () => (
  <footer className="">
    {/* Szara kreska nad footerem */}
    <div className="w-full h-px bg-gray-300 mb-4" />
    <div className="relative mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
        <button
          className="inline-block rounded-full bg-blue-600 p-2 text-white shadow-sm transition hover:bg-blue-500 sm:p-3 lg:p-4"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="sr-only">Back to top</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="lg:flex lg:items-end lg:justify-between">
        <div>
          <div className="flex justify-center text-teal-600 lg:justify-start">
            <img alt="" src={logo} className="h-14 w-auto" />
          </div>
          <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            consequuntur amet culpa cum itaque neque.
          </p>
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="https://portfolio-beta-lyart-23.vercel.app"
            >
              {" "}
              Portfolio{" "}
            </a>
          </li>
          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="https://www.linkedin.com/in/piotr-perczak-8b6a01374/"
            >
              {" "}
              LinkedIn{" "}
            </a>
          </li>
          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="https://github.com/PiotrPerczak"
            >
              {" "}
              GitHub{" "}
            </a>
          </li>
        </ul>
      </div>

      <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
        Copyright &copy; 2022. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
