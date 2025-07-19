
// Carousel component for displaying featured games with autoplay and click-to-modal support
"use client";


import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


// RAWG API key for fetching games
const RAWG_API_KEY = "a9da7b7a0db84f3883518ed837145728";


// Game type for carousel and modal
export type Game = {
  id: number;
  name: string;
  background_image: string;
  rating?: number;
  released?: string;
};



// Props for CarouselPlugin: allows handling game click (e.g. open modal)
type CarouselPluginProps = {
  onGameClick?: (game: Game) => void;
};


export function CarouselPlugin({ onGameClick }: CarouselPluginProps) {
  // Ref for the autoplay plugin
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  // State for fetched games
  const [games, setGames] = React.useState<Game[]>([]);

  // Fetch featured games from RAWG API on mount
  React.useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=5`
    )
      .then((res) => res.json())
      .then((data) => setGames(data.results || []));
  }, []);

  // Render carousel with game cards
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-9/12 mt-25"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {games.map((game) => (
          <CarouselItem key={game.id}>
            <div className="p-1">
              {/* Card for each game, opens modal on click */}
              <Card className="bg-black cursor-pointer" onClick={() => onGameClick && onGameClick(game)}>
                <CardContent className="relative p-0">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                  {/* Bottom gradient overlay for text readability */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-16 rounded-b-lg pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                  {/* Game title overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-4 flex items-end h-16">
                    <h3 className="text-white text-lg font-semibold z-10">
                      {game.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
