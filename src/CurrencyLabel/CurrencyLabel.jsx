import React from "react";
import styles from "./CurrencyLabel.module.css";

export default function CurrencyLabel(props) {
  const {
    currencySelectOptions,
    selectedCurrency,
    onChangeLabel,
    onChangeAmount,
    amount,
  } = props;
  return (
    <label className={styles.label}>
      <select
        className={styles.label_select}
        value={selectedCurrency}
        onChange={onChangeLabel}
      >
        {currencySelectOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        type="number"
        className={styles.label_input}
        value={amount}
        onChange={onChangeAmount}
      />
    </label>
  );
}
