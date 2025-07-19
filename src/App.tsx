
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { CarouselPlugin } from "./components/Carousel";
import ShoppingCart from "./components/ShoppingCart";


export type CartGame = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  quantity: number;
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartGame[]>([]);

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

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar onBasketClick={() => setCartOpen(true)} />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CarouselPlugin />
        <ProductList addToCart={addToCart} />
      </div>
      <Footer />
      <ShoppingCart open={cartOpen} setOpen={setCartOpen} cartItems={cartItems} removeFromCart={removeFromCart} />
    </>
  );
}

export default App;
