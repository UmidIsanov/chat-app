import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  console.log("Userr", user);
  console.log("LoginInfo", loginInfo);

  // Проверка, есть ли пользователь в localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Обновление информации о регистрации
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  // Обновление информации о логине
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  // Функция регистрации пользователя
  const registerUser = useCallback(
    async (e) => {
      if (e) e.preventDefault(); // Проверка наличия e для вызова preventDefault
      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }

      // Сохранение пользователя в localStorage
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );

  // Функция логина пользователя
  const loginUser = useCallback(
    async (e) => {
      if (e) e.preventDefault(); // Проверка наличия e для вызова preventDefault

      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);
      if (response.error) {
        return setLoginError(response);
      }

      // Сохранение пользователя в localStorage
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );

  // Функция выхода пользователя
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
