import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeItems } from "../store/slices/itemsPerPage.slice";

const Settings = () => {
  const defaultItemsPerPage = useSelector((state) => state.itemsPerPage);

  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeItems(itemsPerPage));
  }, [itemsPerPage]);

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="setting-page">
      <i
        style={{ cursor: "pointer" }}
        onClick={goBack}
        className="fa-solid fa-2xl exit-icon fa-arrow-left"
      ></i>
      <div className="setting-option">
        <h1 style={{ fontSize: "2.2rem", letterSpacing: "2px" }}>Settings</h1>
        <div className="items-per-page">
          <h3 className="per-page-title" style={{ textAlign: "center", fontSize: "1.5rem" }}>
            Items per page
          </h3>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            className="input-pokemon input-items"
          >
            <option value={4}>4 items</option>
            <option value={8}>8 items</option>
            <option selected value={12}>
              12 items
            </option>
            <option value={16}>16 items</option>
            <option value={20}>20 items</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
