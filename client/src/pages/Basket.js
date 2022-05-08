import { observer } from "mobx-react-lite";
import { useEffect, useContext } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Context } from "../index";
import { fetchBasket, deleteAll } from "../http/basketApi";
import BasketItem from "../components/BasketItem";

const Basket = observer(() => {
  const { basketStore } = useContext(Context);

  useEffect(() => {
    fetchBasket().then((data) => basketStore.setBasket(data));
    console.log(basketStore.basket);
  }, []);
  const clearBasket = () => {
    deleteAll();
    basketStore.setBasket([]);
  };
  return (
    <Container className="ms-auto">
      <Row className="mt-3 justify-content-center" style={{ fontSize: 50 }}>
        Basket
        <hr />
      </Row>
      <Container>
        {!basketStore.basket.length ? (
          "Nothing is added"
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Col md={3}>Image</Col>
              <Col md={2}>Name</Col>
              <Col md={2}>Price</Col>
              <Col md={3}>Count</Col>
              <Col md={2}>
                <Button onClick={() => clearBasket()}>clear all</Button>
              </Col>
            </div>
            {basketStore.basket.map((item) => {
              return <BasketItem key={item.id} item={item} />;
            })}
            <Button>Order</Button>
          </div>
        )}
      </Container>
    </Container>
  );
});

export default Basket;
