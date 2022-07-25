import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaginationButtons from "./PaginationButtons";
import ClipLoader from "react-spinners/ClipLoader";

const Encounters = () => {
  const [encounters, setEncounters] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [encountersByPage, setEncountersByPage] = useState(6);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const maxPages = [];
  for (let i = 1; i <= Math.ceil(encounters.length / encountersByPage); i++) {
    maxPages.push(i);
  }
  const indexOfLastItem = page * encountersByPage;
  const indexOfFirstItem = indexOfLastItem - encountersByPage;
  const currentItems = encounters.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (page) => {
    setPage(page);
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

  const colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}/encounters`)
      .then((res) => {
        setEncounters(res.data);
      })
      .catch(() => alert("an error has ocurred please try reloading the page"))
      .finally(() => setIsLoading(false));
  }, [name]);
  console.log(encounters);
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {encounters.length !== 0 ? (
        <div className="encounters-page">
          <i
            style={{ cursor: "pointer" }}
            onClick={goBack}
            className="fa-solid fa-2xl exit-icon fa-arrow-left"
          ></i>
          {isLoading ? (
            <div style={{ height: "50vh" }} className="spinner spinner-center">
              <ClipLoader size={180} />
            </div>
          ) : (
            <div className="encounters-container">
              <h1 style={{ fontSize: "2.2rem", letterSpacing: "2px" }}>
                {name.charAt(0).toUpperCase() + name.slice(1)} encounters
              </h1>
              <div className="all-encounters">
                {currentItems.map((encounter) => {
                  const randomNumber = Math.floor(
                    Math.random() * colorArray.length
                  );
                  return (
                    <p
                      style={{ background: colorArray[randomNumber] }}
                      className="each-encounter"
                      key={encounter.location_area.url}
                    >
                      <b>Region: </b>
                      {encounter.location_area.name.replace(/\-/g, " ")}
                    </p>
                  );
                })}
              </div>
              <ul className="pagination-btn encounter-pagination">
                {page > 1 && (
                  <li
                    onClick={() => {
                      previousPage();
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
                  <li href="#pokedexStart">
                    <i
                      onClick={() => {
                        nextPage();
                      }}
                      className="fa-solid fa-arrow-right"
                    ></i>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="encounters-page">
          <i
            style={{ cursor: "pointer" }}
            onClick={goBack}
            className="fa-solid fa-2xl exit-icon fa-arrow-left"
          ></i>
          <h3 className="center-tittle">This pokemon has no encounters</h3>
        </div>
      )}
    </>
  );
};

export default Encounters;
