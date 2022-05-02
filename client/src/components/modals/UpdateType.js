import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { fetchTypes, updateType } from "../../http/deviceApi";
import { Context } from "../../index";
import { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

const UpdateType = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    if (show) {
      fetchTypes().then((data) => device.setTypes(data));
    }
  }, [show]);

  const updateOneType = async (id, name) => {
    await updateType({ id, name });
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{type.name || "Choose brand"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item onClick={() => setType(type)} key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Enter new name of Brand"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Close
        </Button>
        <Button
          variant={"outline-success"}
          onClick={() => updateOneType(type.id, name)}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateType;
