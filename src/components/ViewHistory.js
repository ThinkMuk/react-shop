import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./ViewHistory.scss";

function ViewHistory({ getShoeDatas }) {
  const [visited, setVisited] = useState(
    JSON.parse(sessionStorage.getItem("watched"))
  );

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
                    <h4>{getShoeDatas[a]?.title}</h4>
                    <p>
                      {getShoeDatas[a]?.content} <br />
                      {getShoeDatas[a]?.price} won
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {visited.length <= 0 ? null : (
        <Button
          variant="outline-dark"
          onClick={() => {
            sessionStorage.setItem("watched", JSON.stringify([]));
            setVisited([]);
          }}
        >
          Clear History
        </Button>
      )}
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
