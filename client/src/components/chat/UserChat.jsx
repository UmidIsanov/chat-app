import React, { useContext } from "react";
import { Stack } from "react-bootstrap";
import { UseFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { ChatContext } from "../../context/chatContext";
import { unReadNotificationsFunc } from "../../utils/unreadNotificationsFunc";
import moment from "moment";
import { useLatestMessage } from "../../hooks/useFetchLatesMessage";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = UseFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisNotificationsAsRead } =
    useContext(ChatContext);
  const { latestMessage } = useLatestMessage(chat);

  const unreadNotifications = unReadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id
  );

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  const truncateText = (text) => {
    if (!text) return "";
    return text.length > 20 ? `${text.substring(0, 20)}...` : text;
  };

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length) {
          markThisNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="d-flex gap-2">
        <div className="avatar-circle">{getInitial(recipientUser?.name)}</div>
        <div className="text-container">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">
            {latestMessage?.text && (
              <span>{truncateText(latestMessage?.text)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {latestMessage?.createdAt
            ? moment(latestMessage.createdAt).calendar()
            : ""}
        </div>
        <div
          className={
            thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
          }
        >
          {thisUserNotifications?.length || ""}
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
