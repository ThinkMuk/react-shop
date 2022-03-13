/* eslint-disable */
import React, { useState, useContext, lazy, Suspense, useEffect } from "react";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import shoeListdata from "./data.js";
import { Link, Route, Routes, Switch } from "react-router-dom";
import axios from "axios";
// import Detail from "./components/Detail.js";
const Detail = lazy(() => {
  return import("./components/Detail.js");
});
// import Cart from "./components/Cart.js";
const Cart = lazy(() => {
  return import("./components/Cart.js");
});
const ViewHistory = lazy(() => {
  return import("./components/ViewHistory.js");
});

let stockContext = React.createContext();

function App() {
  const [shoeDatas, setShoeDatas] = useState(shoeListdata);
  let [loading, setLoading] = useState(false);
  const [shoeStock, setShoeStock] = useState([10, 11, 9, 5, 1, 7]);

  //todo: localStorage history UI to be added
  localStorage.setItem("watched", JSON.stringify([]));

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className="navbarTitle" to="/">
              ThinkShoe Store
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link className="navbarLink" to="/cart">
                Cart
              </Link>
              <Link className="navbarLink" to="/detail/0">
                Today's Shoes
              </Link>
              <Link className="navbarLink" to="/viewHistory">
                View History
              </Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  not implemented
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  not implemented
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  not implemented
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  not implemented
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        {/* exact path는 그 페이지일때만 해당 html을 표시하는것 */}
        <Route path="/" element={<Main />} />
        <Route
          path="/detail/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Detail
                getShoeDatas={shoeDatas}
                getShoeStock={shoeStock}
                setShoeStock={setShoeStock}
              />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/viewHistory"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ViewHistory getShoeDatas={shoeDatas} />
            </Suspense>
          }
        />
        {/* 라우트에 컴포넌트도 넣을 수 있다! */}
      </Routes>
    </div>
  );

  function Main() {
    return (
      <div>
        <div className="jumbotron">
          <div>
            <h1>20% Season Off</h1>
            <p>
              Give your feet the beauty treatment that only brand new shoes can
              give.
            </p>
            <p>
              <Button
                variant="dark"
                onClick={() => {
                  window.alert("Event Period: 2022-02-20 ~ 2022-08-20");
                }}
              >
                Learn more
              </Button>{" "}
            </p>
          </div>
        </div>
        {/* col-md-4 같은 경우는 bootstrap에서 지원해주는 반응형이다 */}
        <div className="container">
          <stockContext.Provider value={shoeStock}>
            <div className="row">
              {shoeDatas.map(function (a, i) {
                return <ShoeList key={i} tempCount={i} tempShoe={shoeDatas} />;
              })}
            </div>
          </stockContext.Provider>
        </div>
        {shoeDatas.length < 6 ? (
          <Button
            variant="outline-dark"
            onClick={() => {
              //post는 서버에 데이터를 보내고 싶을떄 사용
              // axios.post("서버URL", { id: "codingapple", pw: 1234 });

              //LocalStorage 가 초기화 되지 않게 다른 곳에 저장을 해둔 뒤, (157 이동)
              var LocalTemp = localStorage.getItem("watched");
              LocalTemp = JSON.parse(LocalTemp);

              setLoading(true);
              axios
                .get("https://api.jsonbin.io/b/617bfdf34a82881d6c6741a8")
                //성공시
                .then((result) => {
                  setLoading(false);
                  setShoeDatas([...shoeDatas, ...result.data]);

                  //다시 불러옴으로서 api를 불러오고 난 뒤 History가 안사라지도록 함
                  localStorage.setItem("watched", JSON.stringify(LocalTemp));
                })
                //실패시
                .catch(() => {
                  setLoading(false);
                  alert("ERROR");
                });
            }}
          >
            Show more info
          </Button>
        ) : null}
        {/* {shoeDatas.length >= 6 ? (
          <Button
            variant="outline-dark"
            onClick={() => {
              setShoeDatas(shoeDatas.slice(0, 3));
            }}
          >
            Minimize tab
          </Button>
        ) : null} */}
        {loading === true ? (
          <div>
            <p>Loading ...</p>
          </div>
        ) : null}
      </div>
    );
  }

  function ShoeList({ tempCount, tempShoe }) {
    let shoeStock = useContext(stockContext);

    return (
      <div className="col-md-4">
        <Link className="list-text-design" to={`/detail/${tempCount}`}>
          <img src={`../images/shoes${tempCount + 1}.jpg`} width="100%" />
          <h4>{tempShoe[tempCount].title}</h4>
          <StockLeft tempCount={tempCount} />
          <p>
            {tempShoe[tempCount].content} <br />
            {tempShoe[tempCount].price} won
          </p>
        </Link>
      </div>
    );
  }
  function StockLeft({ tempCount }) {
    let shoeStock = useContext(stockContext);
    return <p>Stock: {shoeStock[tempCount]}</p>;
  }
}

export default App;
