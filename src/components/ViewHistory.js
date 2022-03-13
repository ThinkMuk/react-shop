import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ViewHistory.scss";

function ViewHistory({ getShoeDatas }) {
  const visited = JSON.parse(localStorage.getItem("watched"));

  //   todo: UI, click-move function to be implemented
  return (
    <div className="container">
      <div className="title">
        <h3>Visited</h3>
      </div>
      <div className="row">
        {visited.length <= 0 ? (
          <ItemIsEmpty />
        ) : (
          <div className="table">
            {visited.map(function (a, i) {
              return (
                <div className="center" key={a}>
                  <Link className="list-text-design" to={`/detail/${a}`}>
                    <img
                      src={`../images/shoes${parseInt(a) + 1}.jpg`}
                      width="100%"
                    />
                    <h4>{getShoeDatas[a].title}</h4>
                    <p>
                      {getShoeDatas[a].content} <br />
                      {getShoeDatas[a].price} won
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function ItemIsEmpty() {
  return (
    <div className="item-empty-reminder">
      <p>You have not yet visited any products!</p>
    </div>
  );
}

export default ViewHistory;
