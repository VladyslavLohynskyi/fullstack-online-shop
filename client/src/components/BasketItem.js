import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { Card, Col, Image, Button } from "react-bootstrap";

import { DEVICE_ROUTE, HTTP_ADRESS } from "../utils/consts";
import {
  deleteOneBasket,
  fetchBasket,
  increment,
  decrement,
} from "../http/basketApi";
import { useContext, useState } from "react";

const BasketItem = observer(({ item }) => {
  const navigate = useNavigate();

  const { basketStore } = useContext(Context);
  const deleteOne = (id) => {
    deleteOneBasket(id);
    fetchBasket().then((data) => basketStore.setBasket(data));
  };
  const incrementCount = async (id) => {
    await increment(id);
    const basket = basketStore.basket.map((el) =>
      el.id === id ? { ...el, count: el.count + 1 } : el
    );
    basketStore.setBasket(basket);
  };
  const decrementCount = async (id) => {
    await decrement(id);
    const basket = basketStore.basket.map((el) => {
      if (el.id === id && el.count > 1) {
        return { ...el, count: el.count - 1 };
      }
      return el;
    });
    basketStore.setBasket(basket);
  };

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Col md={3}>
        <Image
          src={HTTP_ADRESS + item.img}
          style={{ width: 100, height: 100, cursor: "pointer" }}
          onClick={() => {
            navigate(DEVICE_ROUTE + "/" + item.id);
          }}
        ></Image>
      </Col>
      <Col md={2}>{item.name}</Col>
      <Col md={2}>{item.price}</Col>
      <Col md={3} className="d-flex">
        <div
          onClick={() => incrementCount(item.id)}
          style={{ cursor: "pointer" }}
        >
          +
        </div>
        <div style={{ margin: "0px 10px 0px 10px" }}>{item.count}</div>
        <div
          onClick={() => decrementCount(item.id)}
          style={{ cursor: "pointer" }}
        >
          -
        </div>
      </Col>
      <Col md={2}>
        <Button onClick={() => deleteOne(item.id)}>Delete</Button>
      </Col>
    </Card>
  );
});

export default BasketItem;
