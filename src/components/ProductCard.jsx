import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const [count, setCount] = useState(1);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, count);
  };

  return (
    <Card className="m-3 shadow-lg" style={{ width: "22rem" }}>
      <Card.Body className="pt-4 pb-4 px-4">

        <Card.Title className="fw-bold" style={{ fontSize: "1.6rem" }}>
          {product.name}
        </Card.Title>

        <Card.Text className="text-muted" style={{ fontSize: "1.05rem" }}>
          {product.description}
        </Card.Text>

        <div
          className="d-flex justify-content-between mt-3"
          style={{ fontSize: "1.1rem" }}
        >
          <span>
            <strong>Color:</strong> {product.color}
          </span>
          <span>
            <strong>Size:</strong> {product.size}
          </span>
        </div>

        <div
          className="d-flex justify-content-between mt-2"
          style={{ fontSize: "1.1rem" }}
        >
          <span>
            <strong>Brand:</strong> {product.brand}
          </span>
          <span>
            <strong>Material:</strong> {product.material}
          </span>
        </div>

        <div className="mt-3" style={{ fontSize: "1rem" }}>
          <div>
            <strong>SKU:</strong> {product.sku}
          </div>
          <div>
            <strong>Barcode:</strong> {product.barcode}
          </div>
        </div>

        <h4 className="mt-4 fw-bold text-success" style={{ fontSize: "1.7rem" }}>
          Rs. {product.price.toFixed(2)}
        </h4>

        <ButtonGroup className="mt-4 w-100" style={{ height: "3.2rem" }}>
          <Button
            variant="secondary"
            onClick={decrease}
            style={{ fontSize: "1.4rem" }}
          >
            -
          </Button>

          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              minWidth: "180px",
              background: "#f8f9fa",
            }}
          >
            <h4 className="m-0">{count}</h4>
          </div>

          <Button
            variant="secondary"
            onClick={increase}
            style={{ fontSize: "1.4rem" }}
          >
            +
          </Button>
        </ButtonGroup>

        <Button
        variant="primary"
        className="mt-4 w-100"
        style={{ padding: "0.9rem", fontSize: "1.2rem" }}
        onClick={handleAddToCart}
      >
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
