import { observer } from "mobx-react-lite";
import { useContext, useState, useEffect } from "react";
import { Button, Form, Dropdown, Row, Col, Card, Image } from "react-bootstrap";
import { Context } from "../index";
import { fetchBrands, fetchTypes } from "../http/deviceApi";
import { HTTP_ADRESS } from "../utils/consts";

const DeviceForm = observer(({ item, updateDevice }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState(item.info);
  const [brand, setBrand] = useState(
    device.brands.find((el) => el.id === item.brandId)
  );
  const [type, setType] = useState(
    device.types.find((el) => el.id === item.typeId)
  );
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);
  useEffect(() => {
    updateDevice({ name, price, file, info, brand, type, id: item.id });
  }, [name, file, info, brand, type]);

  const addInfo = () => {
    setInfo([
      ...info,
      { title: "", description: "", id: Date.now(), create: true },
    ]);
  };

  const removeInfo = (id) => {
    setInfo(info.filter((i) => i.id !== id));
  };

  const changeInfo = (key, value, id) => {
    setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Card key={item.id}>
      <Form>
        <Image style={{ width: 150 }} src={HTTP_ADRESS + item.img}></Image>
        <Form.Control
          className="mt-2 mb-2"
          placeholder={"Enter name of Device"}
          type="file"
          value={file}
          onChange={selectFile}
        />
        <Dropdown className="mt-2 mb-2">
          <Dropdown.Toggle>{type.name || "Choose Type"}</Dropdown.Toggle>
          <Dropdown.Menu>
            {device.types.map((type) => (
              <Dropdown.Item onClick={() => setType(type)} key={type.id}>
                {type.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mt-2 mb-2">
          <Dropdown.Toggle>{brand.name || "Choose Brand"}</Dropdown.Toggle>
          <Dropdown.Menu>
            {device.brands.map((brand) => (
              <Dropdown.Item onClick={() => setBrand(brand)} key={brand.id}>
                {brand.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          className="mt-2 mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control
          className="mt-2 mb-2"
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button variant={"outline-dark"} onClick={addInfo}>
          add new property
        </Button>
        {info.map((i) => (
          <Row key={i.id} className="mt-2 mb-2">
            <Col md={4}>
              <Form.Control
                value={i.title}
                onChange={(e) => changeInfo("title", e.target.value, i.id)}
                placeholder={"enter title"}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                value={i.description}
                onChange={(e) =>
                  changeInfo("description", e.target.value, i.id)
                }
                placeholder={"enter description"}
              />
            </Col>
            <Col variant={"outline-danger"} md={4}>
              <Button onClick={() => removeInfo(i.id)}>delete</Button>
            </Col>
          </Row>
        ))}
      </Form>
    </Card>
  );
});

export default DeviceForm;
