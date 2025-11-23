import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  // Fetch all products from backend
  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product/all");
      console.log("Products:", response.data);
      setProducts(response.data); // store in state
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  // Load once when component mounts
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <h1 className="m-3">Product Page</h1>
      
      <div className="d-flex flex-wrap">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
