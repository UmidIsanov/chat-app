import React, { useContext } from "react";
import { ChatContext } from "../context/chatContext";

const Chat = () => {
  const { userChats } = useContext(ChatContext);
  console.log("userChats:", userChats);
  return <div>Chat</div>;
};

export default Chat;
