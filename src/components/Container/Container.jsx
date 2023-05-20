import React from "react";
import styles from "./container.module.css";

function Container({ children, width }) {
  return <div className={styles.container} style={{width:`${width ? width : '100%'}`}} >{children}</div>;
}

export default Container;
