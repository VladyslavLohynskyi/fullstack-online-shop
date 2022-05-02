import { Modal, Button, Form } from "react-bootstrap";
import { createBrand, fetchBrands } from "../../http/deviceApi";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
const CreateBrand = ({ show, onHide }) => {
  const [brand, setBrand] = useState("");
  const { device } = useContext(Context);
  useEffect(() => {
    if (show) {
      fetchBrands().then((data) => device.setBrands(data));
    }
  }, [show]);
  const addBrand = async () => {
    await createBrand({ name: brand });
    setBrand("");
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new Brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder={"Enter name of Brand"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Close
        </Button>
        <Button variant={"outline-success"} onClick={addBrand}>
          ADD
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
