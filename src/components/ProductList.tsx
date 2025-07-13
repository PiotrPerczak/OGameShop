import React, { useEffect, useState } from "react";

type Game = {
  id: number;
  name: string;
  background_image: string;
};

export default function ProductList() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch(
      "https://api.rawg.io/api/games?key=a9da7b7a0db84f3883518ed837145728&page_size=12"
    )
      .then((res) => res.json())
      .then((data) => setGames(data.results))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="bg-slate-100 xl:ml-24">
      <div className="mx-auto  px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Bestsellers
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {games.map((game) => (
            <a href="#" className="group relative block overflow-hidden">
              <img
                src={game.background_image}
                alt=""
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                <h3 className="mt-4 text-lg font-medium truncate whitespace-nowrap text-gray-900">
                  {game.name}
                </h3>

                <p className="mt-1.5 text-sm text-gray-700">$14.99</p>

                <form className="mt-4">
                  <button className="block w-full rounded-sm bg-blue-400 p-4 text-sm font-medium transition hover:scale-105">
                    Add to Cart
                  </button>
                </form>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
