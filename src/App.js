import './App.css';
import Container from './components/Container/Container';
import Header from './components/header/Header';
import SearchBox from './components/search/SearchBox';

function App() {
  return (
    <div className="App">
      
     <Header />
     <Container width="1200px"> 
     <SearchBox />

     </Container>

    </div>
  );
}

export default App;
