import React from "react";
import { useNavigate } from "react-router-dom";

const SettingBtn = () => {
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate("/settings");
  };
  return (
    <div>
      <button onClick={goToSettings} className="setting-btn">
        <i
          style={{ color: "white" }}
          className="fa-solid fa-xl fa-gear setting-icon"
        ></i>
      </button>
    </div>
  );
};

export default SettingBtn;
