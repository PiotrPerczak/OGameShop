

import React, { useEffect, useState } from "react";
import type { CartGame } from "../App";



export type Game = {
  id: number;
  name: string;
  background_image: string;
  rating?: number;
  released?: string;
};

type ProductListProps = {
  addToCart: (game: Omit<CartGame, "quantity">) => void;
  platform: 'pc' | 'playstation' | 'xbox';
  onGameClick?: (game: Game) => void;
};

const API_KEY = "a9da7b7a0db84f3883518ed837145728";

const skeletonArray = Array.from({ length: 9 });


const ProductList: React.FC<ProductListProps> = ({ addToCart, platform, onGameClick }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let platformQuery = '';
    if (platform === 'pc') platformQuery = '4';
    if (platform === 'playstation') platformQuery = '18';
    if (platform === 'xbox') platformQuery = '1';
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=9&platforms=${platformQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [platform]);

  return (
    <section id="product-list-section" className="py-18 ">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
          {platform === 'pc' && 'PC Games'}
          {platform === 'playstation' && 'PlayStation Games'}
          {platform === 'xbox' && 'Xbox Games'}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {loading
            ? skeletonArray.map((_, idx) => (
                <div key={idx} className="max-w-[384px] mx-auto animate-pulse">
                  <div className="w-full max-w-sm aspect-square rounded-xl bg-gray-200 mb-5" />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-6 w-40 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
                      <div className="h-6 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="h-12 w-12 bg-gray-200 rounded-full" />
                  </div>
                </div>
              ))
            : games.map((game) => (
                <a
                  key={game.id}
                  href="#"
                  className="max-w-[384px] mx-auto group"
                  onClick={e => {
                    e.preventDefault();
                    if (onGameClick) onGameClick(game);
                  }}
                >
                  <div className="w-full max-w-sm aspect-square cursor-pointer">
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className="w-full h-full rounded-xl object-cover group-hover:opacity-90 transition"
                    />
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <h6 className="font-medium text-xl leading-8 text-black mb-2">
                        {game.name}
                      </h6>
                      <h6 className="font-semibold text-base leading-8 text-gray-600">
                        Released: {game.released}
                      </h6>
                      <h6 className="font-semibold text-xl leading-8 text-blue-600">
                        Rating: {game.rating}
                      </h6>
                    </div>
                    <button
                      className="p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-cyan-700 hover:bg-gray-50"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        addToCart({
                          id: game.id,
                          name: game.name,
                          background_image: game.background_image,
                          rating: game.rating,
                          released: game.released,
                        });
                      }}
                    >
                      <svg
                        className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                      >
                        <path
                          d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                          stroke=""
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
