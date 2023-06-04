import { useState } from "react";
import "./App.css";
import Container from "./components/Container/Container";
import Header from "./components/header/Header";
import InfoCard from "./components/infoCard/InfoCard";
import SearchBox from "./components/search/SearchBox";
import Footer from "./components/footer/Footer";

function App() {
  const [latsData, setLatsData] = useState([]);
const [ImageCity, setImageCity] = useState('');
const [loading, setLoading]=useState(false);

  return (
    <div className="App">
      <Header />
      <Container width="1200px">

        <SearchBox setImageCity={setImageCity} setLatsData={setLatsData} />

        {loading ? <div>loading wait ...</div> :

        <InfoCard setLoading={setLoading} ImageCity={ImageCity} latsData={latsData} />
   
  }
        
        <Footer />
      </Container>
    </div>
  );
}

export default App;
