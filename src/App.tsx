import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { CarouselPlugin } from "./components/Carousel";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onBasketClick={() => setCartOpen(true)} />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CarouselPlugin />
        <ProductList />
      </div>
      <Footer />
      <ShoppingCart open={cartOpen} setOpen={setCartOpen} />
    </>
  );
}

export default App;
