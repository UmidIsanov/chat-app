import React, { useContext } from "react";
import { Container, Navbar, Stack, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import chatIcon from "../assets/chat-fill.svg";
import loginIcon from "../assets/loginIcon.svg";
import logoutIcon from "../assets/logoutIcon.svg";
import registerIcon from "../assets/registerIcon.svg";
import { useTheme } from "../context/ThemeContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  const linkClass = theme === "light" ? "link-dark" : "link-light";

  return (
    <Navbar className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className={`${linkClass} text-decoration-none`}>
            ChattApp
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
          <span className={theme === "light" ? "text-dark" : "text-warning"}>
            Logged in as {user?.name}
          </span>
        )}

        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user ? (
              <>
                <button
                  onClick={toggleTheme}
                  className={`btn btn-link ${linkClass} p-0 `}
                  aria-label="Toggle theme"
                  style={{ fontSize: "1.25rem" }}
                >
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
                <Link
                  onClick={logoutUser}
                  to="/login"
                  className={`${linkClass} text-decoration-none`}
                >
                  Logout
                  <img
                    src={logoutIcon}
                    alt="Logout Icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginLeft: "8px",
                    }}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${linkClass} text-decoration-none`}
                >
                  Login
                  <img
                    src={loginIcon}
                    alt="Login Icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginLeft: "8px",
                    }}
                  />
                </Link>
                <Link
                  to="/register"
                  className={`${linkClass} text-decoration-none`}
                >
                  Register
                  <img
                    src={registerIcon}
                    alt="Register Icon"
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
