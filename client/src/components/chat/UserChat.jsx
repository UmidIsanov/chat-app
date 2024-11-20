import React, { useContext } from "react";
import { Stack } from "react-bootstrap";
import { UseFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { ChatContext } from "../../context/chatContext";
const UserChat = ({ chat, user }) => {
  const { recipientUser } = UseFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);
  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card aling-items-center p2 justify-content-between"
      role="button"
    >
      <div className="d-flex gap-2">
        <div className="avatar-circle">{getInitial(recipientUser?.name)}</div>
        <div className="text-container">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/12/24</div>
        <div className="this-user-notifications">2</div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
