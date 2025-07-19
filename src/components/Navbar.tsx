import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.svg";
import basket from "../assets/basket.svg";

type NavbarProps = {
  onBasketClick: () => void;
  platform: "pc" | "playstation" | "xbox";
  setPlatform: (platform: "pc" | "playstation" | "xbox") => void;
  cartCount: number;
};

export default function Navbar({
  onBasketClick,
  platform,
  setPlatform,
  cartCount,
}: NavbarProps) {
  const scrollToProductList = () => {
    const el = document.getElementById("product-list-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highlight, setHighlight] = useState(false);

  // Animacja podświetlenia koszyka po zmianie cartCount
  useEffect(() => {
    if (cartCount > 0) {
      setHighlight(true);
      const timeout = setTimeout(() => setHighlight(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [cartCount]);

  return (
    <div className="">
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/60 backdrop-blur-md shadow-sm border-b border-gray-200">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={logo} className="h-12 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a
              className={`text-xl font-semibold transition-colors duration-200 cursor-pointer hover:text-orange-600 hover:underline ${
                platform === "pc"
                  ? "text-orange-900 underline"
                  : "text-orange-900"
              }`}
              onClick={() => {
                setPlatform("pc");
                setTimeout(scrollToProductList, 50);
              }}
            >
              PC
            </a>
            <a
              className={`text-xl font-semibold transition-colors duration-200 cursor-pointer hover:text-blue-600 hover:underline ${
                platform === "playstation"
                  ? "text-blue-900 underline"
                  : "text-blue-900"
              }`}
              onClick={() => {
                setPlatform("playstation");
                setTimeout(scrollToProductList, 50);
              }}
            >
              PlayStation
            </a>
            <a
              className={`text-xl font-semibold transition-colors duration-200 cursor-pointer hover:text-green-600 hover:underline ${
                platform === "xbox"
                  ? "text-green-900 underline"
                  : "text-green-900"
              }`}
              onClick={() => {
                setPlatform("xbox");
                setTimeout(scrollToProductList, 50);
              }}
            >
              Xbox
            </a>
          </div>
          <div className="hidden gap-4 lg:flex lg:flex-1 lg:justify-end">
            <button className="relative" onClick={onBasketClick}>
              <img
                width="40"
                src={basket}
                alt="Shopping Cart"
                className={`cursor-pointer transition-shadow duration-300 ${
                  highlight ? "ring-2 ring-blue-400 shadow-lg" : ""
                }`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md animate-bounce min-w-[22px] text-center">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="#"
              className="text-xl flex justify-center items-center font-semibold text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img alt="" src={logo} className="h-8 w-auto" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className=" grid space-y-2 py-6">
                  <a
                    className={`text-xl font-semibold transition-colors duration-200 cursor-pointer hover:text-orange-600 hover:underline ${
                      platform === "pc"
                        ? "text-orange-900 underline"
                        : "text-orange-900"
                    }`}
                    onClick={() => setPlatform("pc")}
                  >
                    PC
                  </a>
                  <a
                    className={`text-xl font-semibold transition-colors duration-200 cursor-pointer hover:text-blue-600 hover:underline ${
                      platform === "playstation"
                        ? "text-blue-900 underline"
                        : "text-blue-900"
                    }`}
                    onClick={() => setPlatform("playstation")}
                  >
                    PlayStation
                  </a>
                  <a
                    className={`text-xl font-semibold transition-colors duration-200 cursor-pointer hover:text-green-600 hover:underline ${
                      platform === "xbox"
                        ? "text-green-900 underline"
                        : "text-green-900"
                    }`}
                    onClick={() => setPlatform("xbox")}
                  >
                    Xbox
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                  <button>
                    <button className="relative" onClick={onBasketClick}>
                      <img
                        width="40"
                        src={basket}
                        alt="Shopping Cart"
                        className={`cursor-pointer transition-shadow duration-300 ${
                          highlight ? "ring-2 ring-blue-400 shadow-lg" : ""
                        }`}
                      />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md animate-bounce min-w-[22px] text-center">
                          {cartCount}
                        </span>
                      )}
                    </button>
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
