import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchOneDevice } from "../http/deviceApi";
import { addToBasket } from "../http/basketApi";
import { HTTP_ADRESS } from "../utils/consts";
import { getAvgRating, addRating } from "../http/ratingApi";
import Vector from "../assets/Vector.png";
import StarRating from "../components/StarRating/StarRating";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const addRate = async (index) => {
    await addRating({ deviceId: id, rate: index });
    getAvgRating(id).then((data) =>
      setRating(Number(data.avgRating).toFixed(1))
    );
  };

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
    getAvgRating(id).then((data) =>
      setRating(Number(data.avgRating).toFixed(1))
    );
  }, []);

  return (
    <Container className="d-flex flex-column justify-content-center ">
      <Container
        className="m-3"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <div>
          {device.img ? (
            <Image src={HTTP_ADRESS + device.img} height={300} />
          ) : null}
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
            <div>
              {device.name} #{device.id}
            </div>
            <div className="d-flex" style={{ alignItems: "center" }}>
              <div>{rating}</div>
              <Image width={25} height={25} src={Vector} />
            </div>

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
        <StarRating addRate={addRate} />
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
