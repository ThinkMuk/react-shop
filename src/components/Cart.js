import React from "react";
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./Cart.scss";
//todo1: cart prices delete button to be implemented
//todo2: reset cart button need to be implemented

function getCart(state) {
  return {
    state: state.reducer,
    alertIsOpen: state.alertReducer,
  };
}

function Cart(props) {
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
        {props.state.length <= 0 ? <ItemIsEmpty /> : null}
        {props.state.map((a, i) => {
          return (
            <tbody>
              <tr>
                <td>{i + 1}</td>
                <td>{props.state[i].name}</td>
                <td>{props.state[i].quan}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      props.dispatch({ type: "stockIncrease", data: i });
                    }}
                  >
                    +
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      props.dispatch({ type: "stockDecrease", data: i });
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
      {props.alertIsOpen === true ? (
        <div className="discount-reminder">
          <p>Buy now and get a 20% discount!</p>
          <Button
            variant="outline-dark"
            onClick={() => {
              props.dispatch({ type: "alertIsClosed" });
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

export default connect(getCart)(Cart);
// export default Cart;
