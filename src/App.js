import React, { useState } from "react";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import shoeListdata from "./data.js";
import { Link, Route, Routes, Switch } from "react-router-dom";
import Detail from "./components/Detail.js";
import axios from "axios";

// npm start 보다는 yarn start 가 더 빠르고 안정적으로 시작할 수 있다
// 본인이 디자인 하기 힘들때는, BootStrap 이라는 외부 source library를 이용해서 사이트를
// 만들 수도 있다
// 사용하기 위해서는 react bootstrap을 검색해 따라하면 된다

// react router을 사용하기 위해선 yarn add react-router-dom 이라는 라이브러리를 설치 해야 한다
// 설치를 완료한 후, index.js에 들어가서 추가적인 설정을 해주면 react router을 사용할 준비가 끝난다

// sass란 ?
// css에서 변수, 연산자, 함수, extend, import 와 같은 function들을 사용 가능하다

//Ajax?
//서버에 '새로고침'없이 요청을 할 수 있게 도와줌
//서버란?
//서버는 누군가 요청을 하면 페이지를 갖다주는 프로그램
//Ajax를 사용하는 3가지 방법
//1.jQuery 설치해서 $.ajax() 쓰기
//2.axios 설치해서 axios.get() 쓰기 - yarn add axios
//3.쌩 자바스크립트 fetch() 쓰기
//axios를 사용하면 JSON을 object로 알아서 바꿔주기 때문에 간편하다
function App() {
  const [shoeDatas, setShoeDatas] = useState(shoeListdata);
  let [loading, setLoading] = useState(false);
  const [shoeStock, setShoeStock] = useState([10, 11, 9]);

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
              {/* todo: console error to be fixed */}
              <Nav.Link>
                <Link className="navbarLink" to="/">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="navbarLink" to="/detail">
                  Detail
                </Link>
              </Nav.Link>
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
            <Nav>
              <Nav.Link href="#deets">not implemented</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                not implemented
              </Nav.Link>
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
            <Detail
              getShoeDatas={shoeDatas}
              getShoeStock={shoeStock}
              setShoeStock={setShoeStock}
            />
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
              <Button variant="dark">Learn more</Button>{" "}
            </p>
          </div>
        </div>
        {/* col-md-4 같은 경우는 bootstrap에서 지원해주는 반응형이다 */}
        <div className="container">
          <div className="row">
            {shoeDatas.map(function (a, i) {
              return <ShoeList key={i} tempCount={i} tempShoe={shoeDatas} />;
            })}
          </div>
        </div>
        <Button
          variant="outline-dark"
          onClick={() => {
            //post는 서버에 데이터를 보내고 싶을떄 사용
            // axios.post("서버URL", { id: "codingapple", pw: 1234 });

            setLoading(true);
            axios
              .get("https://api.jsonbin.io/b/617bfdf34a82881d6c6741a8")
              //성공시
              .then((result) => {
                setLoading(false);
                setShoeDatas([...shoeDatas, ...result.data]);
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
        {loading === true ? (
          <div>
            <p>Loading ...</p>
          </div>
        ) : null}
      </div>
    );
  }

  function ShoeList({ tempCount, tempShoe }) {
    return (
      <div className="col-md-4">
        <img
          src={`https://codingapple1.github.io/shop/shoes${tempCount + 1}.jpg`}
          width="100%"
        />
        <h4>{tempShoe[tempCount].title}</h4>
        <p>
          {tempShoe[tempCount].content} <br />
          {tempShoe[tempCount].price} won
        </p>
      </div>
    );
  }
}

export default App;
