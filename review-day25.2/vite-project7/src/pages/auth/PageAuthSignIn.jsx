import { useContext, useState } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import useChangeListener from "../../libs/hooks/useChangeListener";
import useHTTP from "../../libs/hooks/useHTTP";
import { BASE_URL } from "../../libs/config/settings";
import useJWT from "../../libs/hooks/useJWT";
import { ContextApplication } from "../../libs/config/contexts";
import useValidator from "../../libs/hooks/useValidator";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation";

const PageAuthSignIn = () => {
  const http = useHTTP();
  const jwt = useJWT();
  const [user, setUser] = useState({ username: "", password: "" });
  const userChangeListener = useChangeListener();
  const application = useContext(ContextApplication);

  const userValidator = useValidator({ email: [], password: [] });

  const onSignIn = () => {
    userValidator.reset();
    http.publicHTTP
      .post(`${BASE_URL}/users/signin`, user)
      .then((res) => {
        jwt.set(res.data.token);
        application.setIsAuthenticated(true);
      })
      .catch((err) => {
        userValidator.except(err);
        console.log(err);
      });
  };

  const onEnterSignin = (e) => {
    userValidator.reset();
    if (e.key == "Enter") {
      http.publicHTTP
        .post(`${BASE_URL}/users/signin`, user)
        .then((res) => {
          jwt.set(res.data.token);
          application.setIsAuthenticated(true);
        })
        .catch((err) => {
          userValidator.except(err);
          console.log(err);
        });
    }
  };

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center vh-100 align-items-center">
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Sign in</Card.Title>
                <Form.Group className={"mb-3"}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={user.email}
                    onChange={(e) =>
                      userChangeListener.onChangeText(e, user, setUser)
                    }
                    type={"email"}
                  />
                  <ComponentMessageValidation
                    messages={userValidator.get("email")}
                  />
                </Form.Group>

                <Form.Group className={"mb-4"}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    value={user.password}
                    onChange={(e) =>
                      userChangeListener.onChangeText(e, user, setUser)
                    }
                    onKeyDown={onEnterSignin}
                    type={"password"}
                  />
                  <ComponentMessageValidation
                    messages={userValidator.get("password")}
                  />
                </Form.Group>

                <Form.Group className={"mb-3 d-grid"}>
                  <Button size={"lg"} onClick={onSignIn}>
                    Sign in
                  </Button>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageAuthSignIn;
