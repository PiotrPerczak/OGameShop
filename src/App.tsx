

// Main application entry point
import { useState } from "react";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { CarouselPlugin } from "./components/Carousel"; 
import type { CarouselGame } from "./components/Carousel"; 
import ShoppingCart from "./components/ShoppingCart";
import GameModal from "./components/GameModal";
import GameSearchBar from "./components/GameSearchBar";



// Type for items in the shopping cart
export type CartGame = {
  id: number;
  name: string;
  background_image: string;
  rating?: number;
  released?: string;
  quantity: number;
};


function App() {
  // State for cart modal visibility
  const [cartOpen, setCartOpen] = useState(false);
  // State for cart items
  const [cartItems, setCartItems] = useState<CartGame[]>([]);
  // State for selected platform (PC, PlayStation, Xbox)
  const [platform, setPlatform] = useState<'pc' | 'playstation' | 'xbox'>('pc');
  // State for game info modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  // State for currently selected game in modal
  const [modalGame, setModalGame] = useState<CarouselGame | null>(null);

  // Add a game to the cart (increments quantity if already present)
  const addToCart = (game: Omit<CartGame, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === game.id);
      if (existing) {
        return prev.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...game, quantity: 1 }];
      }
    });
  };

  // Remove a game from the cart by id
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Open modal with game details (from product list or search)
  const openGameModal = (game: CarouselGame) => {
    setModalGame(game);
    setModalOpen(true);
  };
  // Open modal with game details (from carousel)
  const openCarouselGameModal = (game: CarouselGame) => { 
    setModalGame(game);
    setModalOpen(true);
  };

  // Main app layout and component composition
  return (
    <>
      {/* Navbar with platform switch and cart badge */}
      <Navbar
        onBasketClick={() => setCartOpen(true)}
        platform={platform}
        setPlatform={setPlatform}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Featured games carousel */}
        <CarouselPlugin onGameClick={openCarouselGameModal} />
        {/* Live search bar for games */}
        <GameSearchBar onGameClick={openGameModal} />
        {/* Product list for selected platform */}
        <ProductList addToCart={addToCart} platform={platform} onGameClick={openGameModal} />
      </div>
      {/* Footer section */}
      <Footer />
      {/* Shopping cart modal */}
      <ShoppingCart open={cartOpen} setOpen={setCartOpen} cartItems={cartItems} removeFromCart={removeFromCart} />
      {/* Game info modal */}
      <GameModal open={modalOpen} onClose={() => setModalOpen(false)} game={modalGame} onAddToCart={(game) => addToCart(game)} />
    </>
  );
}

export default App;
