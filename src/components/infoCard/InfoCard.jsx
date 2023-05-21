import React from "react";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'

import styles from "./infocard.module.css";
function InfoCard({latsData}) {




  return (
    <div className={styles.infoCard}>
      <div className="left">


      <div id="map" className={styles.map}>

{latsData[0]?.lat && (
      <MapContainer center={[`${latsData[0]?.lat}`, `${latsData[0]?.lon}`]} zoom={13} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

</MapContainer>
)}

      </div>


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
