import { Modal, Button, Form, Card, Col, Image } from "react-bootstrap";
import { DEVICE_ROUTE, HTTP_ADRESS } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { fetchOneDevice, deleteOneDevice } from "../../http/deviceApi";

import { useState } from "react";
import { observer } from "mobx-react-lite";

const DeleteDevice = observer(({ show, onHide }) => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [findDevice, setfindDevice] = useState("");
  const searchDevice = (id) => {
    fetchOneDevice(id).then((data) => setfindDevice(data));
  };

  const deleteDevice = async () => {
    await deleteOneDevice(id);
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex">
          <Form.Control
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={"Enter id of Device"}
            type="number"
            min={1}
          />
          <Button variant={"outline-dark"} onClick={() => searchDevice(id)}>
            Search
          </Button>
        </Form>
        {findDevice ? (
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Col md={4}>
              <Image
                src={HTTP_ADRESS + findDevice.img}
                style={{ width: 100, height: 100, cursor: "pointer" }}
                onClick={() => {
                  navigate(DEVICE_ROUTE + "/" + findDevice.id);
                }}
              ></Image>
            </Col>
            <Col md={4}> {findDevice.name}</Col>
            <Col md={4}>price: {findDevice.price}$</Col>
          </Card>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Close
        </Button>
        <Button variant={"outline-success"} onClick={deleteDevice}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteDevice;
