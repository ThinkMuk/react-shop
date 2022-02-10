import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// useParams 는 Route상에서 받아와지는 id를 이 function에 전달해 주는 역할을 함

function Detail(props) {
  // 이 navigate는 사용자가 이동한 경로를 저장해 둠
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={props.getShoeImages[id]} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.getShoeDatas[id].title}</h4>
          <p>{props.getShoeDatas[id].content}</p>
          <p>{props.getShoeDatas[id].price}원</p>
          <button className="btn btn-danger">주문하기</button>
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
    </div>
  );
}

export default Detail;
