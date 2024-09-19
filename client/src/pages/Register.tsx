import { Typography } from "@mui/material";
import React, { useState } from "react";
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

const Register = () => {
  const [showPassword, setShowPasword] = useState(false);

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
              <FormControl type="text" placeholder="Name" />
              <FormControl type="email" placeholder="Email" />
              <InputGroup>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <Button
                  onClick={() => setShowPasword(!showPassword)}
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </InputGroup>
              <Button variant="primary" type="submit">
                Register
              </Button>
              <Alert variant="danger">
                <p>An error occured</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
