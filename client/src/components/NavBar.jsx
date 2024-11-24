import React, { useContext } from "react";
import { Container, Navbar, Stack, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { ReactComponent as chatIcon } from "../assets/chat-fill.svg";
import loginIcon from "../assets/loginIcon.svg";
import { ReactComponent as LogoutIcon } from "../assets/logoutIcon.svg";
import registerIcon from "../assets/registerIcon.svg";
import { useTheme } from "../context/ThemeContext";
import Notifications from "./chat/Notifications";

const StyledLogoutIcon = styled(LogoutIcon)`
  // color: ${(props) => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
  color: #ffffff;
  width: 24px;
  height: 24px;
  margin-left: 8px;
`;
const StyledChatIcon = styled(chatIcon)`
  color: #ffffff;
  width: 24px;
  height: 24px;
  margin-left: 8px;
`;

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
            <StyledChatIcon theme={{ mode: theme }} />
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
                  className={`btn btn-link ${linkClass} p-0`}
                  aria-label="Toggle theme"
                  style={{ fontSize: "1.25rem" }}
                >
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
                <Notifications />
                <Link
                  onClick={logoutUser}
                  to="/login"
                  className={`${linkClass} text-decoration-none`}
                >
                  Logout
                  <StyledLogoutIcon theme={{ mode: theme }} />
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
