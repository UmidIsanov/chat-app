import { useContext, useState } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка на совпадение паролей
    if (registerInfo.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    registerUser(e); // Вызов функции регистрации
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2 style={{ textAlign: "center" }}>Register</h2>

              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {passwordError && <Alert variant="danger">{passwordError}</Alert>}

              <Button variant="primary" type="submit">
                {isRegisterLoading ? "Loading" : "Register"}
              </Button>

              {registerError?.error && (
                <Alert variant="danger">
                  <p>{registerError.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
