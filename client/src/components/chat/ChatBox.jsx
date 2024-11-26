import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/chatContext";
import { UseFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import bgPhoto from "../../assets/bgPhoto1.jpg";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = UseFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (textMessage.trim() === "") return;
    sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet
      </p>
    );

  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <Stack gap={4} className="chat-box">
        <div className="chat-header">
          <strong>{recipientUser.name}</strong>
        </div>
        <Stack 
          gap={3} 
          className="messages"
          style={{
            backgroundImage: `url(${bgPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '20px',
            borderRadius: '10px',
            position: 'relative'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '10px'
            }}
          />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            {messages &&
              messages.map((message, index) => (
                <Stack
                  key={index}
                  className={`message ${
                    message?.senderId === user?._id
                      ? "self align-self-end"
                      : "align-self-start"
                  } flex-grow-0`}
                  ref={scroll}
                >
                  <span>{message.text}</span>
                  <span className="message-footer">
                    {moment(message.createdAt).calendar()}
                  </span>
                </Stack>
              ))}
          </div>
        </Stack>
        
        <Stack
          direction="horizontal"
          gap={3}
          className="chat-input flex-grow-0"
        >
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            fontFamily="nunito"
            borderColor="rgba(72, 112, 223, 0.2)"
            onKeyDown={handleKeyDown}
          />
          <button className="send-btn" onClick={handleSendMessage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
            </svg>
          </button>
        </Stack>
      </Stack>
    </div>
  );
};

export default ChatBox;
