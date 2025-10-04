import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, change) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
      )
    );
  };

  const checkout = async () => {
    const res = await axios.post("http://localhost:5000/checkout", { cart });
    alert(res.data.message);
    setCart([]);
    setShowCart(false);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🛒 Shopping Cart</h1>
      <button className="cart-toggle" onClick={() => setShowCart(!showCart)}>
         Cart ({cart.length})
      </button>

      {!showCart ? (
        
          <div className="products">
          {products.map(p => (
          <div key={p.id} className="product">
          <img src={p.imageUrl} alt={p.name} />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div> 
        ))}
        </div>
      ) : (
       
          <div className="cart">
        <h2>Your Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name} (₹{item.price})</span>
            <div className="qty-controls">
              <button onClick={() => updateQty(item.id, -1)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, 1)}>+</button>
            </div>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <p className="total">Total: ₹{total}</p>
        <button className="checkout-btn" onClick={checkout} disabled={cart.length === 0}>
          Checkout
        </button>
      </div>
      )}
    </div>
  );
}

export default App;
