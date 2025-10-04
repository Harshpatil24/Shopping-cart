

# 🛒 Simple Shopping Cart (Full Stack)

A minimal full-stack **Shopping Cart Application** built with  
- **Backend:** Node.js + Express  
- **Frontend:** React (Vite)  
- **Styling:** Custom CSS  

Users can browse products, add them to a cart, update quantities, and simulate a checkout.

---

## 🚀 Features
- View product list (fetched from backend API)
- Add items to cart
- Increase / decrease item quantity
- View total price
- Checkout (sends cart data to backend)
- Responsive design

---

## 📂 Project Structure
```

shopping-cart/
│── backend/   # Express server
│   └── server.js
│
│── frontend/  # React + Vite app
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.css
│   └── vite.config.js
│
└── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/shopping-cart.git
cd shopping-cart
````

---

### 2️⃣ Backend Setup (Node.js + Express)

```bash
cd backend
npm init -y
npm install express cors
```

Create `server.js` (already provided in repo).

Run backend:

```bash
node server.js
```

👉 Backend runs at `http://localhost:5000`

---

### 3️⃣ Frontend Setup (React + Vite)

```bash
cd ../frontend
npm create vite@latest .   # Choose "JavaScript + React Compiler"
npm install
npm install axios
```

Run frontend:

```bash
npm run dev
```

👉 Frontend runs at `http://localhost:5173`

---

## 🧪 API Endpoints

* `GET /products` → Fetch product list
* `POST /checkout` → Send cart data (returns success message)

---

## 📸 Screenshots
<img width="1920" height="1080" alt="Screenshot 2025-10-04 165602" src="https://github.com/user-attachments/assets/87ee01c4-d187-45bf-b111-f276c740be5a" />
<img width="1920" height="1080" alt="Screenshot 2025-10-04 165622" src="https://github.com/user-attachments/assets/b8cd2565-4c3d-4ed3-919b-c430b84409f0" />


---

