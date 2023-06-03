import { useState } from "react";
import "./App.css";
import Container from "./components/Container/Container";
import Header from "./components/header/Header";
import InfoCard from "./components/infoCard/InfoCard";
import SearchBox from "./components/search/SearchBox";

function App() {
  const [latsData, setLatsData] = useState([]);
const [ImageCity, setImageCity] = useState('');


  return (
    <div className="App">
      <Header />
      <Container width="1200px">
        <SearchBox setImageCity={setImageCity} setLatsData={setLatsData} />

        <InfoCard ImageCity={ImageCity} latsData={latsData} />
      </Container>
    </div>
  );
}

export default App;
