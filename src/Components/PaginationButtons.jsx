import React from "react";

const PaginationButtons = ({ number, changePage, page, executeScroll }) => {
  return (
    <li
      className={page === number ? "active-page" : null}
      onClick={() => {
        changePage(number);
        executeScroll();
      }}
    >
      <div>{number}</div>
    </li>
  );
};

export default PaginationButtons;
