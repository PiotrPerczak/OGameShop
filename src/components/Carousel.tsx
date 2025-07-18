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

const RAWG_API_KEY = "a9da7b7a0db84f3883518ed837145728";

type Game = {
  id: number;
  name: string;
  background_image: string;
};

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const [games, setGames] = React.useState<Game[]>([]);

  React.useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=5`
    )
      .then((res) => res.json())
      .then((data) => setGames(data.results || []));
  }, []);

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
              <Card className="bg-black">
                <CardContent className="relative p-0">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                  {/* Gradient przyciemniający od lewej do prawej na dole zdjęcia */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-16 rounded-b-lg pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
                    }}
                  />
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
