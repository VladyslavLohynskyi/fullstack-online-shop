import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { Card, Col, Image } from "react-bootstrap";
import Vector from "../assets/Vector.png";
import { DEVICE_ROUTE, HTTP_ADRESS } from "../utils/consts";
import { useContext, useEffect, useState } from "react";

const DeviceItem = observer(({ item }) => {
  const navigate = useNavigate();
  const { device } = useContext(Context);
  const brand = device.brands.find((el) => el.id === item.brandId).name;

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => {
        navigate(DEVICE_ROUTE + "/" + item.id);
      }}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image width={148} height={148} src={HTTP_ADRESS + item.img} />
        <div className="text-black-50 d-flex justify-content-between align-items-center">
          <div>{brand}</div>
          <div className="mt-1 d-flex align-items-center">
            <div>{Number(item.AvgRating).toFixed(1)}</div>
            <Image width={18} height={18} src={Vector} />
          </div>
        </div>
        <div>{item.name}</div>
        <div>#{item.id}</div>
      </Card>
    </Col>
  );
});

export default DeviceItem;
