import React from "react";
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./Cart.scss";

function getCart(state) {
  return {
    state: state,
  };
}

function Cart(props) {
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Product name</th>
            <th>Stock</th>
            <th>Stock Change</th>
          </tr>
        </thead>
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
    </div>
  );
}

export default connect(getCart)(Cart);
// export default Cart;
