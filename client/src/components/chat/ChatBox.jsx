import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/chatContext";
import { UseFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = UseFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const [file, setFile] = useState(null); // Для хранения файла
  const [preview, setPreview] = useState(null); // Для хранения предварительного просмотра
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Установка предварительного просмотра изображения
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      console.log("Предварительный просмотр файла:", objectUrl); // Лог для предварительного просмотра
      return () => URL.revokeObjectURL(objectUrl); // Очистка объекта URL
    }
  }, [file]);

  const handleSendMessage = () => {
    if (textMessage.trim() === "" && !file) return; // Проверка на пустое сообщение и файл
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      console.log("Отправка файла:", file.name); // Лог для отправляемого файла
      fetch("http://localhost:5000/api/uploads/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Файл успешно загружен", data);
          sendTextMessage(
            textMessage,
            user,
            currentChat._id,
            setTextMessage,
            data.filePath // Отправка пути к файлу
          );
          setFile(null); // Сброс файла после отправки
          setPreview(null); // Сброс предварительного просмотра
        })
        .catch((error) => console.error("Ошибка загрузки файла:", error));
    } else {
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Выбран файл:", selectedFile.name); // Лог для выбранного файла
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
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser.name}</strong>
      </div>
      <Stack gap={3} className="messages">
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
              {message.filePath && (
                <a
                  href={message.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Открыть файл
                </a>
              )}
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
      {preview && ( // Предварительный просмотр изображения
        <div className="image-preview">
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "50%", maxHeight: "80px" }}
          />
        </div>
      )}
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72, 112, 223, 0.2)"
          onKeyDown={handleKeyDown}
        />
        <label className="upload-btn">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-paperclip"
            viewBox="0 0 16 16"
          >
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
          </svg>
        </label>
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
  );
};

export default ChatBox;
