import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./ViewHistory.scss";

function visitedArray() {
  var temp = JSON.parse(localStorage.getItem("watched"));
  console.log(temp.length);
  return temp;
}

function ViewHistory({ getShoeDatas }) {
  const visited = visitedArray();

  //   todo: UI, click-move function to be implemented
  return (
    <div className="container">
      <div className="title">
        <h3>Visited</h3>
      </div>
      {visited.length <= 0 ? (
        <ItemIsEmpty />
      ) : (
        <div className="table">
          {visited.map(function (a, i) {
            return (
              <Button variant="secondary" size="sm" key={i}>
                {getShoeDatas[a].title}
              </Button>
            );
          })}
        </div>
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
