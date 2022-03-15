import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let alertInit = true;

//사실 이런 독립적인 함수들은 Redux를 사용할 필요가 없다 (연습용으로 사용해본것)
function alertReducer(state = alertInit, action) {
  if (action.type === "alertIsClosed") {
    return false;
  } else return state;
}
// 10, 11, 9, 5, 1, 7
const initState = [];

//action에 있는 data들은 모두 dispatch가 되어 전달된 data이다
function reducer(state = initState, action) {
  if (action.type === "clearCart") {
    let temp = [...state];
    temp = [];
    window.alert("Your items are now removed! Enjoy your new shopping!");
    return temp;
  } else if (action.type === "addItem") {
    // var LocalTemp = localStorage.getItem("watched");
    // LocalTemp = JSON.parse(LocalTemp);

    // array 안에 있던 a라는 데이터가 temp와 일치하는가
    const searchCart = state.findIndex((a) => {
      return a.id === action.data.id;
    });
    if (searchCart >= 0) {
      let temp = [...state];
      temp[searchCart].quan++;

      return temp;
    } else {
      let temp = [...state];
      temp.push(action.data);

      return temp;
    }
  } else if (action.type === "stockIncrease") {
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

let store = createStore(combineReducers({ reducer, alertReducer }));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
