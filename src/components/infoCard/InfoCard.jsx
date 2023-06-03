//react
import { useEffect, useState, useCallback } from "react";
//components
import ImgList from "../imgList/ImgList";

//third party
import ReactMapGL from "react-map-gl";

//styles
import styles from "./infocard.module.css";
import "mapbox-gl/dist/mapbox-gl.css";

function InfoCard({ latsData, ImageCity }) {
  const [mapData, setMapData] = useState(latsData);
  const [imagesList, setImagesList] = useState([]);

  const [viewport, setViewport] = useState({
    width: 600,
    height: 400,
    latitude: mapData[0]?.lat || 0,
    longitude: mapData[0]?.lon || 0,
    zoom: 5,
  });

  const fetchImages = async () => {
    const images = await fetch(
      `https://api.pexels.com/v1/search?query=${ImageCity}`,
      {
        headers: {
          Authorization: process.env.REACT_APP_IMAGES,
        },
      }
    );
    const res = await images.json();
    return setImagesList(res.photos);
  };

  let mapCode = () => {
    return mapData[0]?.lon && mapData[0]?.lat ? (
      <ReactMapGL
        {...viewport}
        onViewportChange={(newViewport) =>
          setViewport({
            ...newViewport,
            latitude: mapData[0]?.lat,
            longitude: mapData[0]?.lon,
          })
        }
        mapboxAccessToken={process.env.REACT_APP_MAP_TOEKN}
        initialViewState={{
          longitude: `${mapData[0]?.lon}`,
          latitude: `${mapData[0]?.lat}`,
          zoom: 10,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      />
    ) : null;
  };

  useEffect(() => {
    setMapData(latsData);
    mapCode();

    if (ImageCity) {
      fetchImages();
    }

    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: mapData[0]?.lat || 0,
      longitude: mapData[0]?.lon || 0,
    }));
  }, [latsData, ImageCity]);


  const [weatherData, setWeatherData] =useState([])

  const getWiz = useCallback(async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${mapData[0]?.lat}&lon=${mapData[0]?.lon}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const jsonWiz=await res.json()
    return setWeatherData(jsonWiz);
  },[mapData[0]?.lat, mapData[0]?.lon]);

  useEffect(() => {
    if (mapData[0]?.lat && mapData[0]?.lon) {
      getWiz();
    }
  }, [mapData[0]?.lat, mapData[0]?.lon]);

  

  return (
    <div className={styles.infoCard}>
      <div className={styles.left}>
        <div id="map" className={styles.map}>
          {mapCode()}
        </div>
      </div>
      <div className={styles.right}>
        <h3>May 22, 2023 | 11:58 PM</h3>
        <h1>{weatherData.sys.country}</h1>

        <ul>
          <li>Temparture : {weatherData.main?.temp}</li>
          <li>Humdity : {weatherData.main?.humidity}</li>
          <li>feels Like : {weatherData.main?.feels_like}</li>
        </ul>
      </div>

      {imagesList && <ImgList imagesList={imagesList} />}
    </div>
  );
}

export default InfoCard;
