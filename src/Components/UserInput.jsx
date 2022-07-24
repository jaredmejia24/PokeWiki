import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeUserName } from "../store/slices/user.slice";
import { useNavigate } from "react-router-dom";

const UserInput = () => {
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(changeUserName(""));
  }, []);
  
  const submit = (e) => {
    e.preventDefault();
    dispatch(changeUserName(userName));
    navigate("/pokedex");
  };

  return (
    <div className="center-user-input">
      <div className="title-user-input">
        <h1 className="user-input-title">Hello trainer!</h1>
        <img
          className="pokemon-trainer-img"
          src="https://www.seekpng.com/png/full/201-2011786_red-by-xous-54-red-pokemon-trainer-png.png"
          alt="pokemon trainer"
        />
      </div>
      <form onSubmit={submit}>
        <p style={{ textAlign: "center", fontSize: "1.4rem" }}>
          Give me your name to start
        </p>
        <input
          className="input-user"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="user-btn">
          <i
            style={{ color: "white" }}
            className="fa-solid fa-xl fa-paper-plane"
          ></i>
        </button>
      </form>
    </div>
  );
};

export default UserInput;
