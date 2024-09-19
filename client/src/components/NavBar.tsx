import React from "react";
import { Container, Navbar, Stack, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LiaTelegram } from "react-icons/lia";
import { MdLogin } from "react-icons/md";
const NavBar = () => {
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            <LiaTelegram />
          </Link>
        </h2>
        <span className="text-warning">Logged in as Timur</span>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            <Link to="/register" className="link-light text-decoration-none">
              Register
            </Link>
            <Link to="/login" className="link-light text-decoration-none">
              Login <MdLogin />
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
