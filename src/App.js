import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import axios from "axios";
import "./App.css";

function App() {
  const APIUrl = `https://api.exchangerate.host/latest`;
  const [currency, setCurrency] = useState({ AMD: null });

  useEffect(() => {
    const fetchCurrency = async () => {
      const getAMD = await axios(APIUrl);
      const rateAMD = getAMD.data.rates.AMD;
      setCurrency({ ...currency, AMD: rateAMD });
    };
    fetchCurrency();
  }, []);

  return (
    <div className="price-container">
      <Product
        name="banana."
        price="1$"
        description="Fresh bananas from Ecuador."
        amd={currency.AMD}
      />
    </div>
  );
}

export default App;
