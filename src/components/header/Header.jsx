import React from "react";
import styles from "./header.module.css";
const logo="./img/logo.svg";

function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="" />
           <h3>your weather partner</h3>
    </header>
  );
}

export default Header;
