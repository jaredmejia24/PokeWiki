import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Encounters from "./Components/Encounters";
import Pokedex from "./Components/Pokedex";
import PokemonDetail from "./Components/PokemonDetail";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import SettingBtn from "./Components/SettingBtn";
import Settings from "./Components/Settings";
import UserInput from "./Components/UserInput";
import bg from '../src/image/pokeball.jpg';

function App() {
  document.body.style.background = "#1D1B1B";
  document.body.style.color = "white";

  return (
    <HashRouter>
      <div className="background-img">
        <img id="bgImage" className="bg-img" src={bg} alt="" />
      </div>
      <Routes>
        <Route path="/" element={<UserInput />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<PokemonDetail />} />
          <Route path="/pokedex/:name/encounters" element={<Encounters />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <SettingBtn />
    </HashRouter>
  );
}

export default App;
