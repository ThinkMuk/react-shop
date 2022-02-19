import React from "react";
import { Table, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import "./Cart.scss";
//todo1: cart prices delete button to be implemented
//todo2: reset cart button need to be implemented

function Cart() {
  //state를 더 쉽게 꺼내쓰는 방법 (신문법)
  //redux안에 있던 모든 state를 여기 state로 return하는것
  const state = useSelector((state) => state.reducer);
  const alertIsOpen = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product name</th>
            <th>Stock</th>
            <th>Stock Change</th>
          </tr>
        </thead>
        {state.length <= 0 ? <ItemIsEmpty /> : null}
        {state.map((a, i) => {
          return (
            <tbody>
              <tr>
                <td>{i + 1}</td>
                <td>{state[i].name}</td>
                <td>{state[i].quan}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      dispatch({ type: "stockIncrease", data: i });
                    }}
                  >
                    +
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      dispatch({ type: "stockDecrease", data: i });
                    }}
                  >
                    -
                  </Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      {/* redux 연습용 */}
      {console.log(alertIsOpen)}
      {alertIsOpen === true ? (
        <div className="discount-reminder">
          <p>Buy now and get a 20% discount!</p>
          <Button
            variant="outline-dark"
            onClick={() => {
              dispatch({ type: "alertIsClosed" });
            }}
          >
            Close
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function ItemIsEmpty() {
  return (
    <div className="item-empty-reminder">
      <p>Your shopping cart is empty!</p>
    </div>
  );
}

// function getCart(state) {
//   return {
//     state: state.reducer,
//     alertIsOpen: state.alertReducer,
//   };
// }

// export default connect(getCart)(Cart);
export default Cart;
