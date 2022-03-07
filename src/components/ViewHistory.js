import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function visitedArray() {
  var temp = JSON.parse(localStorage.getItem("watched"));

  console.log(temp);
  return temp;
}

function ViewHistory({ getShoeDatas }) {
  const visited = visitedArray();

  //   todo: UI, click-move function to be implemented
  return (
    <div>
      <h3>Visited</h3>
      {visited.map(function (a, i) {
        return (
          <Button variant="secondary" size="sm">
            {getShoeDatas[a].title}
          </Button>
        );
      })}
    </div>
  );
}

export default ViewHistory;
