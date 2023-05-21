import { useState } from 'react';
import './App.css';
import Container from './components/Container/Container';
import Header from './components/header/Header';
import InfoCard from './components/infoCard/InfoCard';
import SearchBox from './components/search/SearchBox';

function App() {

const [latsData, setLatsData] =useState([]);

  return (
    <div className="App">
      
     <Header />
     <Container width="1200px"> 
     <SearchBox setLatsData={setLatsData} />

     <InfoCard latsData={latsData} />

     </Container>

    </div>
  );
}

export default App;
