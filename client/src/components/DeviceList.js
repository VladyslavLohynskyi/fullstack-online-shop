import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.devices.map((item) => (
        <DeviceItem key={item.id} item={item}></DeviceItem>
      ))}
    </Row>
  );
});

export default DeviceList;
