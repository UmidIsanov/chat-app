import React from "react";
import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";
import { UseFetchRecipientUser } from "../../hooks/useFetchRecipient";
const UserChat = ({ chat, user }) => {
  const { recipientUser } = UseFetchRecipientUser(chat, user);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card aling-items-center p2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="25px" alt="avatar" />
        </div>
        <div className="text-container">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/12/24</div>
        <div className="this-user-notifications">2</div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
};

export default UserChat;