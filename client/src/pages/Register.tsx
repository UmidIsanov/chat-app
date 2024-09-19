import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Form,
  Row,
  Col,
  Stack,
  FormControl,
  InputGroup,
  Button,
  Alert,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { registerInfo, updateRegisterInfo } = authContext;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Form>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>
              <FormControl
                type="text"
                placeholder="Name"
                value={registerInfo.name}
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <FormControl
                type="email"
                placeholder="Email"
                value={registerInfo.email}
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <InputGroup>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={registerInfo.password}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    })
                  }
                />
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </InputGroup>
              <Button variant="primary" type="submit">
                Register
              </Button>
              <Alert variant="danger">
                <p>An error occurred</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
