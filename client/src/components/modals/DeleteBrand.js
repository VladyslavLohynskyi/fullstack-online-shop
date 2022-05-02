import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { fetchBrands, deleteOneBrand } from "../../http/deviceApi";
import { Context } from "../../index";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

const DeleteBrand = observer(({ show, onHide, type }) => {
  const { device } = useContext(Context);
  useEffect(() => {
    if (show) {
      fetchBrands().then((data) => device.setBrands(data));
    }
  }, [show]);

  const deleteBrand = () => {
    deleteOneBrand(device.selectedBrand.id).then(device.setSelectedBrand({}));
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
            <Dropdown.Toggle>
              {device.selectedBrand.name || "Choose brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
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
        <Button variant={"outline-success"} onClick={deleteBrand}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteBrand;
