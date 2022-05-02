import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import Star from "../assets/Star.png";
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
    <Col md={12} className="d-flex flex-column justify-content-center ">
      <Container className="m-3 d-flex justify-content-center">
        <Col md={4}>
          <Image width={300} heigth={300} src={HTTP_ADRESS + device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center ">
            <h2 className="d-flex justify-content-center  ">{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${Star}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around "
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
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
        </Col>
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
    </Col>
  );
};

export default DevicePage;
