import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import axios from "axios";

async function updateQuantity(id, quantity) {
  try {
    await axios.put(`http://localhost:8080/product/update/${id}/${quantity}`);
    console.log("Updated:", id, quantity);
  } catch (error) {
    console.error("Update error:", error);
  }
}


export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    // 1. Update quantities in DB
    for (const item of cart) {
      await updateQuantity(item.id, item.quantity);
    }

    // 2. Empty cart
    setCart([]);
    localStorage.removeItem("cart");

    // 3. Notify user
    alert("Checkout successful!");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      <div className="row">
        {/* Cart Items */}
        <div className="col-md-8">
          {cart.map((item) => (
            <Card className="mb-3 shadow-sm" key={item.id}>
              <Card.Body>
                {/* Title + Remove */}
                <div className="d-flex justify-content-between">
                  <Card.Title>{item.name}</Card.Title>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>

                {/* Details */}
                <Card.Text className="text-muted mb-1">
                  <strong>Color:</strong> {item.color} &nbsp;&nbsp;
                  <strong>Size:</strong> {item.size}
                </Card.Text>

                {/* Price */}
                <Card.Text className="fw-bold" style={{ fontSize: "1.2rem" }}>
                  Rs. {item.price.toFixed(2)}
                </Card.Text>

                {/* Quantity */}
                <ButtonGroup>
                  <Button variant="secondary" onClick={() => decrease(item.id)}>
                    -
                  </Button>

                  <div
                    className="d-flex align-items-center justify-content-center px-3"
                    style={{ minWidth: "50px", background: "#f8f9fa" }}
                  >
                    <strong>{item.quantity}</strong>
                  </div>

                  <Button variant="secondary" onClick={() => increase(item.id)}>
                    +
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="col-md-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Summary</h4>

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>Rs. {subtotal.toFixed(2)}</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <span>Total</span>
                <strong style={{ fontSize: "1.3rem" }}>
                  Rs. {subtotal.toFixed(2)}
                </strong>
              </div>

              <Button
                className="mt-4 w-100"
                variant="primary"
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
