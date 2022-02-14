import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

let initState = [
  { id: 0, name: "tempShoes1", quan: 2 },
  { id: 1, name: "tempShoes2", quan: 5 },
];

function reducer(state = initState, action) {
  if (action.type === "stockIncrease") {
    let temp = [...state];
    temp[action.data].quan++;
    return temp;
  } else if (action.type === "stockDecrease") {
    let temp = [...state];
    if (temp[action.data].quan > 0) {
      temp[action.data].quan--;
      return temp;
    } else {
      window.alert("Stock is out of range!");
      return temp;
    }
  } else {
    return state;
  }
}

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
