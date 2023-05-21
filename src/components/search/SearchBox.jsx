import React, { useCallback, useEffect, useState } from "react";
import styles from "./searchbox.module.css";

function SearchBox({setLatsData}) {
  const [city, setCity] = useState("");
  const [lats, setLats]=useState(null)

  const fetchData =useCallback( async () => {
    const data =
      await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.REACT_APP_API_KEY}
      `);
    const res = await data.json();
    setLatsData(res);
    return setLats(res) ;
  },[city]);

// console.log(lats[0].lat ? lats[0].lat : 'not found')

  useEffect(() => {
    
    const getLats = setTimeout(() => {
      if(city){
      fetchData();}
    }, 2000);


    return () => {
      clearTimeout(getLats);
    };
  }, [fetchData]);

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
