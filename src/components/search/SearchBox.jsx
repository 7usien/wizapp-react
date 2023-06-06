import React, { useCallback, useEffect, useState } from "react";
import styles from "./searchbox.module.css";

function SearchBox({ setLatsData, setImageCity }) {
  const [city, setCity] = useState("");

  const fetchData = useCallback(async () => {
    const data =
      await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.REACT_APP_API_KEY}
      `);
    const res = await data.json();
    return setLatsData(res);
  }, [city]);

  useEffect(() => {
    const getLats = setTimeout(() => {
      if (city) {
        setImageCity(city);
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(getLats);
    };
  }, [city]);


  return (
    <div className={styles.search}>
      <form>
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          type="text"
          placeholder="search for a city weather"
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default SearchBox;
