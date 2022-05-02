import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { fetchBrands, updateBrand } from "../../http/deviceApi";
import { Context } from "../../index";
import { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

const UpdateBrand = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  useEffect(() => {
    if (show) {
      fetchBrands().then((data) => device.setBrands(data));
    }
  }, [show]);

  const updateOneBrand = async (id, name) => {
    await updateBrand({ id, name });
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{brand.name || "Choose brand"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item onClick={() => setBrand(brand)} key={brand.id}>
                  {brand.name}
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
          onClick={() => updateOneBrand(brand.id, name)}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateBrand;
