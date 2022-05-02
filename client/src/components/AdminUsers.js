import { useEffect, useState } from "react";

import { Card, Button, Col, Form } from "react-bootstrap";

import { getByCriteria, getUser } from "../http/userApi";

const AdminUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  useEffect(() => {
    getByCriteria("ADMIN").then((data) => setAdmins(data.rows));
  }, []);

  const findUser = () => {
    getUser(email).then((data) => setUser(data));
  };

  return (
    <Card
      style={{
        width: "80%",
        margin: "auto",
        padding: 15,
        marginTop: 15,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Col
        style={{
          borderRight: "1px solid gray",
          marginRight: 10,
        }}
      >
        <h3>list of admins</h3>
        {admins.map((el) => (
          <Card
            key={el.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p style={{ margin: "auto" }}>{el.email}</p> <Button>D</Button>
          </Card>
        ))}
      </Col>
      <Col>
        <h3>add admins</h3>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Form.Control
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Button onClick={findUser}>Search</Button>
        </Form>
        {user ? (
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p style={{ margin: "auto" }}>{user.email}</p>
            <Button>+</Button>
          </Card>
        ) : (
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              color: "gray",
            }}
          >
            No users with this email
          </h4>
        )}
      </Col>
    </Card>
  );
};

export default AdminUsers;
