import { useContext } from "react";
import { Container, Navbar, Stack, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import chatIcon from "../assets/chat-fill.svg";
import loginIcon from "../assets/loginIcon.svg";
import logoutIcon from "../assets/logoutIcon.svg";
import registerIcon from "../assets/registerIcon.svg";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75 rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            ChattApp{" "}
            <img
              src={chatIcon}
              alt="Chat Icon"
              style={{
                width: "24px",
                height: "24px",
                marginLeft: "8px",
              }}
            />
          </Link>
        </h2>
        {user && (
          <span className="text-warning">Logged in as {user?.name}</span>
        )}

        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
                <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="link-light text-decoration-none"
                >
                  Logout{" "}
                  <img
                    src={logoutIcon}
                    alt="Chat Icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginLeft: "8px",
                    }}
                  />
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                  <img
                    src={loginIcon}
                    alt="Chat Icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginLeft: "8px",
                    }}
                  />
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Register
                  <img
                    src={registerIcon}
                    alt="Chat Icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginLeft: "8px",
                    }}
                  />
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
