/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
// useParams 는 Route상에서 받아와지는 id를 이 function에 전달해 주는 역할을 함

let Box = styled.div`
  padding: 20px;
`;
let Title = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;

function Detail(props) {
  //alert 가 보이는지 안보이는지 저장하는 함수
  // 항상 보이는 UI가 아닌 이상 이렇게 만듦
  // const [alert, setAlert] = useState(true);

  // 이 navigate는 사용자가 이동한 경로를 저장해 둠
  const { id } = useParams();
  const navigate = useNavigate();
  const [Tab, setTab] = useState(0);
  const [aniSwitch, setAniSwitch] = useState(false);
  const [aniAlert, setAniAlert] = useState(false);
  function decShoeStock(tempID) {
    let tempShoeStock = [...props.getShoeStock];
    if (tempShoeStock[tempID] > 0) {
      window.alert("Your order has been placed successfully!");
      tempShoeStock[tempID] = tempShoeStock[tempID] - 1;
      props.setShoeStock(tempShoeStock);
    } else {
      window.alert("This product is out of stock");
    }
  }

  useEffect(() => {
    setAniAlert(true);
    let timer = setTimeout(() => {
      setAniAlert(false);
      // setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="container">
      <Box>
        <Title color="black">Detail</Title>
      </Box>
      {/* {alert == true ? ( */}
      <CSSTransition
        in={aniAlert}
        classNames="alertTransition"
        timeout={2000}
        unmountOnExit
      >
        <div className="my-alert">
          <p>This product is almost out of stock!</p>
        </div>
      </CSSTransition>
      {/* ) : null} */}
      <div className="row">
        <div className="col-md-6">
          <img src={`../images/shoes${parseInt(id) + 1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.getShoeDatas[id].title}</h4>
          <p>{props.getShoeDatas[id].content}</p>
          <p>{props.getShoeDatas[id].price}원</p>
          <StockInfo getShoeStock={props.getShoeStock} getID={id}></StockInfo>
          <button
            className="btn btn-danger"
            onClick={() => {
              decShoeStock(id);
              props.dispatch({
                type: "addItem",
                data: { id: id, name: props.getShoeDatas[id].title, quan: 1 },
              });
            }}
          >
            주문하기
          </button>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              navigate(-1);
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setAniSwitch(false);
              setTab(0);
            }}
          >
            Descriptions
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setAniSwitch(false);
              setTab(1);
            }}
          >
            Reviews
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              setAniSwitch(false);
              setTab(2);
            }}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={aniSwitch} classNames="tabTransition" timeout={500}>
        <TabContent Tab={Tab} setAniSwitch={setAniSwitch} />
      </CSSTransition>
    </div>
  );
}

function TabContent({ Tab, setAniSwitch }) {
  useEffect(() => {
    setAniSwitch(true);
  });
  if (Tab == 0) {
    return (
      <div>
        <br />
        Descriptions
      </div>
    );
  } else if (Tab == 1) {
    return (
      <div>
        <br />
        Reviews
      </div>
    );
  } else if (Tab == 2) {
    return (
      <div>
        <br />
        Questions
      </div>
    );
  }
}

function StockInfo({ getShoeStock, getID }) {
  return <p>Stock : {getShoeStock[getID]}</p>;
}

function getDetail(state) {
  return {
    state: state.reducer,
    alertIsOpen: state.alertReducer,
  };
}

export default connect(getDetail)(Detail);
