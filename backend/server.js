const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

products = [ 
  { id: 1, name: "Dell 16 Plus 2-in-1 convertible business laptop with QHD+ display ideal for creators and professionals. View at Dell.", price: 65000, imageUrl: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell-plus/db06250/media-gallery/blue/notebook-db06250t-bl-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=517&qlt=100,1&resMode=sharp2&size=517,402&chrss=full" },
  { id: 2, name: "iPhone 16 128 GB", price: 58000, imageUrl: "https://m.media-amazon.com/images/I/61eYPkT2zZL._SX466_.jpg" },
  { id: 3, name: " JBL Headphones", price: 3000, imageUrl: "https://m.media-amazon.com/images/I/71uBLsZVFhL._SL1500_.jpg" },
  { id: 4, name: "Samsung Galaxy Watch 7", price: 19000, imageUrl: "https://m.media-amazon.com/images/I/71d7quY-KxL._SX569_.jpg" }
];

app.get("/products",(req,res)=>{
    res.json(products);
});

app.post("/checkout",(req,res)=>{
    console.log("order received",req.body);
    res.json({message:"checkout confirmed"});
});

Port = 5000
app.listen(Port,()=>{console.log(`Backend started at port ${Port}`)});
