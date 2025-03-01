import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
