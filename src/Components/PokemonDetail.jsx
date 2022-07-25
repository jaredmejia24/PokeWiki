import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const PokemonDetail = () => {
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => {
        setPokemonInfo(res.data);
        setIsLoading(false);
      });
  }, [id]);

  let bgColor;
  let bgImageColor;

  const backgroundColors = useSelector((state) => state.backgroundColors);

  for (let i in backgroundColors) {
    if (i.toLowerCase() === pokemonInfo.types?.[0].type.name.toLowerCase()) {
      bgColor = backgroundColors[i][0].backgroundColor;
      bgImageColor = backgroundColors[i][1].filter;
      break;
    }
  }
  const goToPokedex = () => {
    navigate("/pokedex");
  };

  const goToEncounters = () => {
    navigate(`/pokedex/${pokemonInfo.forms[0].name}/encounters`);
  };

  document.body.style.background = bgColor;
  if (bgImageColor) {
    document.getElementById("bgImage").style = bgImageColor;
  }
  return (
    <div className="each-pokemon-page">
      <i
        style={{ cursor: "pointer" }}
        onClick={goToPokedex}
        className="fa-solid fa-xl exit-icon fa-arrow-left"
      ></i>
      <div className="container-pokemon-detail">
        <img
          onClick={goToPokedex}
          className="logo-pokemon"
          src="https://logos-marcas.com/wp-content/uploads/2020/05/Pokemon-Logo.png"
          alt="Pokemon Logo"
        />
        {isLoading ? (
          <div className="spinner">
            <ClipLoader size={180} />
          </div>
        ) : (
          <div className="container-info-pokemon-detail">
            <div className="pokemon-page-card pokemon-main-card">
              <img
                className="pokemon-page-img"
                src={
                  pokemonInfo.sprites?.other["official-artwork"].front_default
                }
                alt="Pokemon image"
              />
              <div className="position-top">
                <div className="weight-height-pokemon">
                  <div>
                    <p style={{ fontSize: "1.7rem" }}>
                      <b>{pokemonInfo.weight} hg</b>
                    </p>
                    <p style={{ color: "gray", marginTop: "-1rem" }}>Weight</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "1.7rem" }}>
                      <b>{pokemonInfo.height} dm</b>
                    </p>
                    <p style={{ color: "gray", marginTop: "-1rem" }}>Height</p>
                  </div>
                </div>
                <div style={{ marginTop: "-2rem" }}>
                  <div className="center-pokemon-detail">
                    <h3 className="pokemon-detail-name">
                      {pokemonInfo.name?.charAt(0).toUpperCase() +
                        pokemonInfo.name?.slice(1)}
                    </h3>
                    <p className="id-number"># {pokemonInfo.id}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pokemon-card-type-and-abilities">
              <div className="pokemon-page-card card-type">
                <h3
                  style={{
                    fontSize: "1.8rem",
                    textAlign: "center",
                    margin: "0",
                  }}
                >
                  Type
                </h3>
                {pokemonInfo.types?.map((type) => {
                  let color;
                  for (let i in backgroundColors) {
                    if (i.toLowerCase() === type.type.name) {
                      color = backgroundColors[i][0];
                    }
                  }
                  return (
                    <p
                      key={type.type.url}
                      style={color}
                      className="pokemon-detail-type color-white"
                    >
                      {type.type.name.charAt(0).toUpperCase() +
                        type.type.name.slice(1)}
                    </p>
                  );
                })}
              </div>
              <div className="pokemon-page-card abilities-card">
                <h3
                  style={{
                    fontSize: "1.8rem",
                    textAlign: "center",
                    margin: "0",
                  }}
                >
                  Abilities
                </h3>
                {pokemonInfo.abilities?.map((ability) => (
                  <p className="pokemon-abilities" key={ability.ability.url}>
                    {ability.ability.name.charAt(0).toUpperCase() +
                      ability.ability.name.slice(1)}
                  </p>
                ))}
              </div>
            </div>
            <div className="pokemon-page-card stats-base-card">
              <h3
                style={{
                  fontSize: "1.8rem",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                Stats Base
              </h3>
              <ul className="base-stat-grid">
                <li>Hp:</li>
                <li>
                  <p
                    style={{
                      width: `${
                        (pokemonInfo.stats?.[0].base_stat / 150) * 100
                      }%`,
                    }}
                  >
                    {pokemonInfo.stats?.[0].base_stat}/150
                  </p>
                </li>
                <li>Attack:</li>
                <li>
                  <p
                    style={{
                      width: `${
                        (pokemonInfo.stats?.[1].base_stat / 150) * 100
                      }%`,
                    }}
                  >
                    {pokemonInfo.stats?.[1].base_stat}/150
                  </p>
                </li>
                <li>Defense:</li>
                <li>
                  <p
                    style={{
                      width: `${
                        (pokemonInfo.stats?.[2].base_stat / 150) * 100
                      }%`,
                    }}
                  >
                    {pokemonInfo.stats?.[2].base_stat}/150
                  </p>
                </li>
                <li>Speed:</li>
                <li>
                  <p
                    style={{
                      width: `${
                        (pokemonInfo.stats?.[5].base_stat / 150) * 100
                      }%`,
                    }}
                  >
                    {pokemonInfo.stats?.[5].base_stat}/150
                  </p>
                </li>
              </ul>
            </div>
            <div
              onClick={goToEncounters}
              className="pokemon-page-card encounter-card"
            >
              <i class="fa-solid fa-location-dot"></i>
              <p>Encounters</p>
            </div>
            <div className="pokemon-page-card movement-card">
              <h3
                style={{
                  fontSize: "1.8rem",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                Movements
              </h3>
              <ul>
                {pokemonInfo.moves?.map((move) => (
                  <li key={move.move.url}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
