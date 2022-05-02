import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { fetchTypes, deleteOneType } from "../../http/deviceApi";
import { Context } from "../../index";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

const DeleteType = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  useEffect(() => {
    if (show) {
      fetchTypes().then((data) => device.setTypes(data));
    }
  }, [show]);

  const deleteType = () => {
    deleteOneType(device.selectedType.id).then(() => {
      device.setTypes(
        device.types.filter((el) => el.id !== device.selectedType.id)
      );
      device.setSelectedType({});
    });
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType.name || "Choose type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Close
        </Button>
        <Button variant={"outline-success"} onClick={deleteType}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteType;
