import styles from "./infocard.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";

import ReactMapGL from "react-map-gl";


function InfoCard({ latsData }) {
  let [mapData, setMapData] = useState(latsData);

  const [viewport, setViewport] = useState({
    width: 600,
    height: 400,
    latitude: mapData[0]?.lat || 0,
    longitude: mapData[0]?.lon || 0,
    zoom: 11
  });
  let mapCode = () => {
    return mapData[0]?.lon && mapData[0]?.lat ? (
      <ReactMapGL {...viewport}  onViewportChange={newViewport => setViewport({...newViewport,
        latitude:mapData[0]?.lat,
        longitude:mapData[0]?.lon
      })}
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
    mapCode()

    setViewport(prevViewport => ({
      ...prevViewport,
      latitude: mapData[0]?.lat || 0,
      longitude: mapData[0]?.lon || 0
    }));
    
  }, [latsData]);

  

  return (
    <div className={styles.infoCard}>
  
      <div className="left">
        <div id="map" className={styles.map}>{mapCode()}</div>
      </div>
      <div className="right">
        <h3>May 22, 2023 | 11:58 PM</h3>
        <h1>London City</h1>

        <ul>
          <li>Temparture : 45</li>
          <li>Humdity : 10%</li>
          <li>feels Like : 40</li>
        </ul>
      </div>
    </div>
  );
}

export default InfoCard;
