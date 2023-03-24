import React, { useEffect, useState } from "react";
import { CurrencyAPI } from "./services/apis/CurrencyAPI";
import Header from "./Header/Header.jsx";
import CurrencyLabel from "./CurrencyLabel/CurrencyLabel.jsx";
import styles from "./App.module.css";

function App() {
  const [usdCurrency, setUsdCurrency] = useState();
  const [eurCurrency, setEurCurrency] = useState(null);
  const [currencySelectOptions, setCurrencySelectOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  useEffect(() => {
    CurrencyAPI.get("EUR").then((data) => {
      const firstCurrency = Object.keys(data.rates)[0];
      setCurrencySelectOptions([...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency]);
      setEurCurrency(data.rates["UAH"]);
    });

    CurrencyAPI.get("USD").then((data) => {
      setUsdCurrency(data.rates["UAH"]);
    });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      CurrencyAPI.get(fromCurrency, toCurrency).then((data) => {
        setExchangeRate(data.rates[toCurrency]);
      });
    }
  }, [fromCurrency, toCurrency]);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

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
