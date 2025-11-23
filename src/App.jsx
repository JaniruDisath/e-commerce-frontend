import { Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import Products from "./pages/Products"
import Cart from "./pages/Cart"

export default function App() {
  return (
    <div>
  
      <CustomNavbar/>
      {/* Navigation
      <nav style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav> */}

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}