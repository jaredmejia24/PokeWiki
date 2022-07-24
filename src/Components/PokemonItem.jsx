import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PokemonItem = ({ pokemon }) => {
  const [pokemonInfo, setPokemonInfo] = useState({});
  let color;
  const navigate = useNavigate();
  const backgroundColors = useSelector((state) => state.backgroundColors);

  useEffect(() => {
    axios.get(pokemon.url).then((res) => setPokemonInfo(res.data));
  }, []);

  for (let i in backgroundColors) {
    if (i.toLowerCase() === pokemonInfo.types?.[0].type.name.toLowerCase()) {
      color = backgroundColors[i][0];
      break;
    }
  }

  const goToEachPokemonPage = () => {
    navigate(`/pokedex/${pokemonInfo.id}`);
  };

  return (
    <div>
      <li onClick={goToEachPokemonPage} style={color} className="each-pokemon">
        <div className="info-pokemon">
          <h4
            style={{ margin: "0", textAlign: "center" }}
            className="title-pokemon"
          >
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h4>
          <ul>
            <li>
              Types:{" "}
              {pokemonInfo.types?.map((typeElement) => (
                <span key={typeElement.type.url}>
                  {typeElement.type.name},{" "}
                </span>
              ))}
            </li>
            <li>Hp: {pokemonInfo.stats?.[0].base_stat}</li>
            <li>Attack: {pokemonInfo.stats?.[1].base_stat}</li>
            <li>Defense: {pokemonInfo.stats?.[2].base_stat}</li>
            <li>Speed: {pokemonInfo.stats?.[5].base_stat}</li>
          </ul>
        </div>
        <div className="img-pokemon">
          <img
            src={pokemonInfo.sprites?.other["official-artwork"].front_default}
            alt="pokemon image"
          />
        </div>
      </li>
    </div>
  );
};

export default PokemonItem;
