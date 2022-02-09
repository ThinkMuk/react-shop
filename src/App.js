import React, { useState } from "react";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import shoeListdata from "./data.js";
import { Link, Route, Switch } from "react-router-dom";

// npm start 보다는 yarn start 가 더 빠르고 안정적으로 시작할 수 있다
// 본인이 디자인 하기 힘들때는, BootStrap 이라는 외부 source library를 이용해서 사이트를
// 만들 수도 있다
// 사용하기 위해서는 react bootstrap을 검색해 따라하면 된다

// react router을 사용하기 위해선 yarn add react-router-dom 이라는 라이브러리를 설치 해야 한다
// 설치를 완료한 후, index.js에 들어가서 추가적인 설정을 해주면 react router을 사용할 준비가 끝난다

function App() {
  const [shoeDatas, setShoes] = useState(shoeListdata);
  const [shoeImages, setShoeImages] = useState([
    "/images/shoes1.jpg",
    "/images/shoes2.jpg",
    "/images/shoes3.jpg",
  ]);

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ThinkShoe Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* exact path는 그 페이지일때만 해당 html을 표시하는것 */}
      <Route exact path="/">
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
            {shoeImages.map(function (shoeTemp, i) {
              return (
                <ShoeList
                  key={i}
                  tempCount={i}
                  tempShoeImage={shoeImages}
                  tempShoe={shoeDatas}
                />
              );
            })}
          </div>
        </div>
      </Route>

      <Route exact path="/detail">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src="/images/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">상품명</h4>
              <p>상품설명</p>
              <p>120000원</p>
              <button className="btn btn-danger">주문하기</button>
            </div>
          </div>
        </div>
      </Route>
      {/* 라우트에 컴포넌트도 넣을 수 있다! */}
    </div>
  );

  function ShoeList({ tempCount, tempShoeImage, tempShoe }) {
    return (
      <div className="col-md-4">
        <img src={tempShoeImage[tempCount]} width="100%" />
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
