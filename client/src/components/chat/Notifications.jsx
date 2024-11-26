import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/chatContext";
import { AuthContext } from "../../context/AuthContext";
import { unReadNotificationsFunc } from "../../utils/unreadNotificationsFunc";
import moment from "moment";
const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { notifications, userChats, allUsers } = useContext(ChatContext);

  const unReadNotifications = unReadNotificationsFunc(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });
  console.log("un", unReadNotifications);
  console.log("mo", modifiedNotifications);
  return (
    <div className="notifications">
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-bell-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
        </svg>
        {unReadNotifications?.length === 0 ? null : (
          <span className="notiification-count">
            <span>{unReadNotifications?.length}</span>
          </span>
        )}
      </div>

      {isOpen ? (
        <div className="notification-box">
          <div className="notifications-header">
            <div
              style={{
                position: "absolute",
                whiteSpace: "nowrap",
                paddingTop: "5px",
                backgroundColor: "#242f3d",
              }}
            >
              Mark all as read
            </div>
          </div>
          {modifiedNotifications?.length === 0 ? (
            <span className="notification">No notifications yet ... </span>
          ) : null}
          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => {
              return (
                <div
                  key={index}
                  className={
                    n.isRead ? "notification" : "notification not-read"
                  }
                >
                  <span>{`${n.senderName} sent you a new message`}</span>
                  <span className="notification-time">
                    {moment(n.date).calendar()}
                  </span>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default Notifications;
