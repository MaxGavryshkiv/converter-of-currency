import React, { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import CurrencyLabel from "./CurrencyLabel/CurrencyLabel.jsx";
import styles from "./App.module.css";

const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest";

function App() {
  const [usdCurrency, setUsdCurrency] = useState();
  const [eurCurrency, setEurCurrency] = useState();
  const [currencySelectOptions, setCurrencySelectOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(`${BASE_URL}?base=EUR`, {
      method: "GET",
      redirect: "follow",
      headers: { apikey: "rGlR1znoRYYeQNlv7OhvBqVN9gHCqnPk" },
    })
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencySelectOptions([...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
        setEurCurrency(data.rates["UAH"]);
      });

    fetch(`${BASE_URL}?base=USD`, {
      method: "GET",
      redirect: "follow",
      headers: { apikey: "rGlR1znoRYYeQNlv7OhvBqVN9gHCqnPk" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsdCurrency(data.rates["UAH"]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`, {
        method: "GET",
        redirect: "follow",
        headers: { apikey: "rGlR1znoRYYeQNlv7OhvBqVN9gHCqnPk" },
      })
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className={styles.App}>
      <Header usdPrice={usdCurrency} eurPrice={eurCurrency} />

      <main>
        <form className={styles.main_form}>
          <CurrencyLabel
            currencySelectOptions={currencySelectOptions}
            selectedCurrency={fromCurrency}
            onChangeLabel={(e) => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
          <CurrencyLabel
            currencySelectOptions={currencySelectOptions}
            selectedCurrency={toCurrency}
            onChangeLabel={(e) => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
