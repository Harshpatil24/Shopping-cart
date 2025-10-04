// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App




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
        // <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        //   {products.map(p => (
        //     <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", width: "200px" }}>
        //       <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
        //       <h3>{p.name}</h3>
        //       <p>₹{p.price}</p>
        //       <button onClick={() => addToCart(p)}>Add to Cart</button>
        //     </div>

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
        // <div style={{ marginTop: "20px" }}>
        //   <h2>Your Cart</h2>
        //   {cart.map(item => (
        //     <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        //       <span>{item.name} (₹{item.price})</span>
        //       <div>
        //         <button onClick={() => updateQty(item.id, -1)}>-</button>
        //         <span style={{ margin: "0 10px" }}>{item.qty}</span>
        //         <button onClick={() => updateQty(item.id, 1)}>+</button>
        //       </div>
        //       <span>₹{item.price * item.qty}</span>
        //     </div>
        //   ))}
        //   <h3>Total: ₹{total}</h3>
        //   <button onClick={checkout} disabled={cart.length === 0}>Checkout</button>
        // </div>

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
