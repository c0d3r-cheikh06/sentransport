import './App.css';
import Header from './Header';
import ListeLignes from './ListeLignes';
import Footer from './Footer';

function App() {
  const lignes = [
    {  id: 1, numero: "1", depart: "Parcelles Assainies", arrivee: "Plateau", arrets: 14, },
    {  id: 2, numero: "7", depart: "Guediawaye", arrivee: "Place Obe", arrets: 18, },
    {  id: 3, numero: "15", depart: "Pikine", arrivee: "Medina", arrets: 12, },
    {  id: 4, numero: "23", depart: "Ouakam", arrivee: "Grand Dakar", arrets: 10, },
    {  id: 5, numero: "8", depart: "Almadies", arrivee: "Colobane", arrets: 16, },
    {  id: 6, numero: "12", depart: "Yoff", arrivee: "Sandaga", arrets: 11, },
  ];

  return (
    <div className="App">
      <Header />

      <main className="contenu">
        <ListeLignes lignes={lignes} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
