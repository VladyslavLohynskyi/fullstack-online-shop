import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchOneDevice } from "../http/deviceApi";
import { addToBasket } from "../http/basketApi";
import { HTTP_ADRESS } from "../utils/consts";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);
  return (
    <Container className="d-flex flex-column justify-content-center ">
      <Container
        className="m-3"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <div>
          <Image src={HTTP_ADRESS + device.img} height={300} />
        </div>
        <div>
          <Card
            className="d-flex flex-column align-items-center justify-content-around "
            style={{
              fontSize: 32,
              border: "5px solid lightgray",
              height: 300,
            }}
          >
            <div>#{device.id}</div>
            <h3>{device.price} uah</h3>
            <Button
              variant={"outline-dark"}
              onClick={() => addToBasket({ deviceId: Number(id) })}
            >
              Add to Cart
            </Button>
          </Card>
        </div>
      </Container>
      <Container>
        <h1>Characteristics</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title} : {info.description}
          </Row>
        ))}
      </Container>
    </Container>
  );
};

export default DevicePage;
