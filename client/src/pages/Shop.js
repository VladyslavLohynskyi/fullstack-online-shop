import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import TypeBar from "../components/TypeBar";
import { fetchBrands, fetchTypes, fetchDevices } from "../http/deviceApi";

const Shop = observer(() => {
  const { device } = useContext(Context);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, inputValue, 1, device.limit).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      inputValue,
      device.page,
      device.limit
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand, inputValue]);

  const changeInput = (e) => {
    setInputValue(e.target.value);
  };

  const debouncedChangeHandler = useMemo(() => debounce(changeInput, 1000), []);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <input onChange={debouncedChangeHandler} />

          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
