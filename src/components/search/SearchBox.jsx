import React from "react";
import styles from './searchbox.module.css'

function SearchBox() {
  return (
    <div className={styles.search}>
      <form>
        <input type="text" placeholder="search for a city weather" />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default SearchBox;
