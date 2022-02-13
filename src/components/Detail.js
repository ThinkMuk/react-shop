/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { CSSTransition } from "react-transition-group";
// useParams 는 Route상에서 받아와지는 id를 이 function에 전달해 주는 역할을 함

//styled-component: css 를 미리 입혀놓은 컴포넌트
//편리하게 보이긴 하지만 수십개의 div에서 수십개의 컴포넌트로 바뀌는것
//(class가 겹치는 가능성은 배제시켜주긴 한다) *선택사항

// 컴포넌트들은 다 life cycle이 존재한다
// 개발자는 hook으로 컴포넌트의 인생 중간중간에 뭔가 명령을 줄 수 있다
// ex) <Detail/> 퇴장 전에 이것좀 해주세요
// 요즘은 useEffect 라는 것을 사용해 훅을 만든다
//몇 초 후에 코드를 실행하는 javascript 함수는 setTimeout(function()=>{}, 00ms)

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

  //컴포넌트가 등장/ 업데이트시 실행됨
  //(따라서 input 값을 받아서 페이지에 표시하고 있으면 계속 업데이트 되고 있기 때문에 useEffect가 계속 실행됨)
  // 따라서 useEffect(()=>{},[here]) 에 적어두면 here이라는 state가 변경이 될때만 실행이 되라는 함수가 완성이 된다
  // useEffect의 대괄호를 빈칸으로 두면 해당 component가 등장시 '한 번' 실행하고 끝나는 함수가 된다
  useEffect(() => {
    setAniAlert(true);
    let timer = setTimeout(() => {
      setAniAlert(false);
      // setAlert(false);
    }, 2000);
    // 컴포넌트가 사라질 때 코드를 실행시킬수도 있다
    // return function 어쩌구() {실행할코드 ~~~}
    // setTimeout을 사용할 때는 타이머 해제 스킬을 사용해야 나중에 버그가 안난다
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

export default Detail;
