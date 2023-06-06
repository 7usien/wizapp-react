//react
import { useEffect, useState, useCallback } from "react";
//components
import ImgList from "../imgList/ImgList";

//third party
import ReactMapGL from "react-map-gl";
import Map from 'react-map-gl';

//styles
import styles from "./infocard.module.css";
import "mapbox-gl/dist/mapbox-gl.css";

function InfoCard({ latsData, ImageCity, setLoading }) {

  const [mapData, setMapData] = useState(latsData);
  const [imagesList, setImagesList] = useState([]);
  const [weatherData, setWeatherData] = useState([]);



  const [viewport, setViewport] = useState({
    width: 600,
    height: 400,
    latitude: mapData[0]?.lat || 0,
    longitude: mapData[0]?.lon || 0,
    zoom: 5,
  });

  const fetchImages = useCallback(async () => {
    const images = await fetch(
      `https://api.pexels.com/v1/search?query=${ImageCity}`,
      {
        headers: {
          Authorization: process.env.REACT_APP_IMAGES,
        },
      }
    );
    const res = await images.json();
     setImagesList(res.photos);
  },[ImageCity]);


  useEffect(() => {
    setMapData(latsData);

    if (ImageCity) {
      fetchImages();
    }

    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: mapData[0]?.lat || 0,
      longitude: mapData[0]?.lon || 0,
    }));
  }, [mapData[0]?.lat, mapData[0]?.lon, ImageCity]);


  const getWiz = useCallback(async () => {
    setLoading(true);

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${mapData[0]?.lat}&lon=${mapData[0]?.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    const jsonWiz = await res.json();
    setLoading(false);
    return setWeatherData(jsonWiz);
    
  }, [mapData, setLoading]);

  useEffect(() => {
      getWiz();
    
  }, [ mapData[0]?.lat,mapData[0]?.lon]);

  const showDate = () => {
    const date = new Date();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${date.toDateString()}`;
    return currentDate;
  };
  console.log(weatherData)

  return (
    <>
      <div className={styles.infoCard}>
        <div className={styles.right}>
          <h3>{showDate()}</h3>

          <h1>{weatherData.name}</h1>

          <ul>
            <li>
              Current Temp :
              <span className={styles.value}>
                {Math.round(weatherData.main?.temp)}
                <span className={styles.iconWiz}>
                  <img
                    alt=""
                    src={`http://openweathermap.org/img/w/${weatherData.weather?.[0].icon}.png`}
                  />
                </span>
              </span>
            </li>
            <li>
              Humdity :{" "}
              <span className={styles.value}>
                {weatherData.main?.humidity}%
              </span>
            </li>
            <li>
              feels Like :{" "}
              <span className={styles.value}>
                {weatherData.main?.feels_like}
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.left}>
          <span className={styles.imageThum}>
            <img src={imagesList[0]?.src.medium} alt="" />
          </span>
        </div>
      </div>

      <div className={styles.maps}>
        <div id="map" className={styles.map}>


        <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />

        </div>
      </div>

      {imagesList && <ImgList imagesList={imagesList} />}
    </>
  );
}

export default InfoCard;
