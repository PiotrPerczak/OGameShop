import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { CarouselPlugin } from "./components/Carousel";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CarouselPlugin />
        <ProductList />
      </div>
      <Footer />
    </>
  );
}

export default App;
