import React from "react";
import Product from "./Product/Product";
import "./App.css";

function App() {
  return (
    <div className="price-container">
      <Product
        name="banana."
        price="1$"
        description="Fresh bananas from Ecuador."
        usd="487"
      />
    </div>
  );
}

export default App;
