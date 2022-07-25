import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaginationButtons from "./PaginationButtons";
import PokemonItem from "./PokemonItem";
import ClipLoader from "react-spinners/ClipLoader";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const Pokedex = () => {
  const userName = useSelector((state) => state.user.userName);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [pokemonsByPage, setPokemonsByPage] = useState(itemsPerPage);
  const [pageNumberLimit, setPageNumberLimit] = useState(9);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(9);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [inputPokemonType, setInputPokemonType] = useState("All pokemons");
  const [inputSearch, setInputSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  document.body.style.background = "#1D1B1B";
  document.body.style.color = "white";
  document.getElementById("bgImage")?.removeAttribute("style");

  const navigate = useNavigate();
  const maxPages = [];
  for (let i = 1; i <= Math.ceil(pokemons.length / pokemonsByPage); i++) {
    maxPages.push(i);
  }
  const indexOfLastItem = page * pokemonsByPage;
  const indexOfFirstItem = indexOfLastItem - pokemonsByPage;
  const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154`)
      .then((res) => {
        setPokemons(res.data.results);
      })
      .catch(() => alert("an error has ocurred please try reloading the page"))
      .finally(() => setIsLoading(false));

    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setPokemonTypes(res.data.results));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (inputPokemonType === "All pokemons") {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154`)
        .then((res) => {
          setPokemons(res.data.results);
        })
        .catch(() => alert("an error has ocurred please try reloading the page"))
        .finally(() => setIsLoading(false));
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/type/${inputPokemonType}/`)
        .then((res) => {
          setPokemons(res.data.pokemon);
        })
        .catch(() => alert("an error has ocurred please try reloading the page"))
        .finally(() => setIsLoading(false));
    }
  }, [inputPokemonType]);

  const goToHome = () => {
    navigate("/");
  };

  const nextPage = () => {
    setPage(page + 1);
    if (page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const previousPage = () => {
    setPage(page - 1);
    if ((page - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  const goToPokemonDetail = (e) => {
    e.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${inputSearch.toLowerCase()}/`)
      .then((res) => {
        setPokemons(res.data.results);
        navigate(`/pokedex/${inputSearch.toLowerCase()}`);
      })
      .catch(() => alert("Nombre no valido"));
  };

  return (
    <div className="pokedex">
      <div className="flex-end">
        <button onClick={goToHome} className="exit-btn">
          <i
            style={{ color: "white" }}
            className="fa-solid fa-xl fa-arrow-right-from-bracket"
          ></i>
        </button>
      </div>
      <div className="adjust-text-pokedex">
        <h2>Pokedex</h2>
        <p>Welcome {userName}, here you can find your favorite pokemon</p>
      </div>
      <form
        onSubmit={goToPokemonDetail}
        ref={myRef}
        className="center-pokedex-form"
      >
        <div className="switch-button">
          <div className="adjust-input-pokedex">
            <label>Type</label>
            <input
              value={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              type="checkbox"
              name="switch-button"
              id="switch-label"
              className="switch-button__checkbox"
            />
            <label
              htmlFor="switch-label"
              className="switch-button__label"
            ></label>
            <label>Pokemon</label>
          </div>
          <br />
          {isChecked ? (
            <input
              className="input-pokemon search-pokemon-input"
              placeholder="Search here..."
              type="text"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
          ) : (
            <select
              value={inputPokemonType}
              onChange={(e) => setInputPokemonType(e.target.value)}
              className="input-pokemon"
              name="pokemonTypes"
              id="pokemonTypes"
            >
              <option selected>All pokemons</option>
              {pokemonTypes.map((type) => (
                <option key={type.url}>{type.name}</option>
              ))}
            </select>
          )}
        </div>
      </form>
      {isLoading ? (
        <div className="spinner spinner-center">
          <ClipLoader color={"white"} size={150} />
        </div>
      ) : (
        <>
          <ul className="pokemons-list">
            {currentItems.map((pokemonItem) => {
              return (
                <PokemonItem
                  pokemon={pokemonItem.pokemon || pokemonItem}
                  key={pokemonItem.url || pokemonItem.pokemon.url}
                />
              );
            })}
          </ul>
          <ul className="pagination-btn">
            {page > 1 && (
              <li
                to="pokedex#pokedexStart"
                onClick={() => {
                  previousPage();
                  executeScroll();
                }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </li>
            )}
            {maxPages.map((number) => {
              {
                if (
                  number < maxPageNumberLimit + 1 &&
                  number > minPageNumberLimit
                ) {
                  return (
                    <PaginationButtons
                      executeScroll={executeScroll}
                      page={page}
                      key={number}
                      number={number}
                      changePage={changePage}
                    />
                  );
                }
              }
            })}
            {page < maxPages.length && (
              <li to="pokedex#pokedexStart" href="#pokedexStart">
                <i
                  onClick={() => {
                    nextPage();
                    executeScroll();
                  }}
                  className="fa-solid fa-arrow-right"
                ></i>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Pokedex;
