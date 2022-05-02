import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { registration, login } from "../http/userApi";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";

const { Container, Form, Card, Button, Row } = require("react-bootstrap");

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 54 }}
      >
        <Card style={{ width: 600 }} className="p-5">
          <h1 className="m-auto">
            {isLogin ? "Authorization" : "Registration"}
          </h1>
          <Form className="d-flex flex-column">
            <Form.Control
              className="mt-3"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-3"
              placeholder="Enter your password..."
            ></Form.Control>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              {isLogin ? (
                <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
              ) : (
                <NavLink to={LOGIN_ROUTE}>Login</NavLink>
              )}
              <Button variant={"outline-success"} onClick={() => auth()}>
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
});

export default Auth;
