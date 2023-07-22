import React from "react";

const Filter = ({ tab, handleTab }) => {
  return (
    <nav className="filter-box">
      <span> Filter By: </span>
      <div className="filters">
        <button
          className={`btn ${tab === "unread" ? "active-filter-btn" : ""}`}
          onClick={() => handleTab("unread")}
        >
          Unread
        </button>
        <button
          className={`btn ${tab === "read" ? "active-filter-btn" : ""}`}
          onClick={() => handleTab("read")}
        >
          Read
        </button>
        <button
          className={`btn ${tab === "favorites" ? "active-filter-btn" : ""}`}
          onClick={() => handleTab("favorites")}
        >
          Favourite
        </button>
      </div>
    </nav>
  );
};

export default React.memo(Filter);
