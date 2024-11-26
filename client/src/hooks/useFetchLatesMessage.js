import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (!chat?._id) return;

        const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

        if (!response || response.error) {
          console.error("Error getting messages...", response?.error);
          return;
        }

        const lastMessage = response?.[response.length - 1] || null;
        setLatestMessage(lastMessage);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    getMessages();
  }, [chat?._id, newMessage, notifications]);

  return { latestMessage };
};
