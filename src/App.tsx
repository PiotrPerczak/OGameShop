import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex">
      <Sidebar />
      <ProductList></ProductList>
      </div>
      
    </>
  );
}

export default App;
