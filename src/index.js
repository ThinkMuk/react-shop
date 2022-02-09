import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// BrowserRouter 와 HashRouter이 있는데 차이점은
// HashRouter은 더 안전하게 라우팅 할 수 있게 해줌
// BrowserRouter 같은 경우 라우팅을 리액트가 아니라 서버에게 요청할 수도 있어서 위험
// 따라서, BrowserRouter은 서버에서 서버 라우팅 방지하는 API를 작성해둬야함

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
