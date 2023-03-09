import React from "react";
import styles from "./Header.module.css";

export default function Header({ usdPrice, eurPrice }) {
  return (
    <header className={styles.header}>
      <ul className={styles.header_list}>
        <li className={styles.header_list__item}>
          <span className={styles.logo}>Convertor</span>
        </li>
        <li className={styles.header_list__item}>
          USD: <span className={styles.list_item}>{usdPrice}</span>
        </li>
        <li className={styles.header_list__item}>
          EUR: <span className={styles.list_item}>{eurPrice}</span>
        </li>
      </ul>
    </header>
  );
}
