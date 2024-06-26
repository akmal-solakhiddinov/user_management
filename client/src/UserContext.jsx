import React, { createContext, useContext, useEffect, useReducer } from "react";

export const API_BASE_URL = "https://user-management-l3wm.onrender.com/api";

const initialState = {
  user: null,
  isLogin: false,
  isLoading: false,
  error: "",
  users: [],
};

const reducers = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "auth/login":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isLoading: false,
        user: payload.user,
        isLogin: true,
        error: "",
      };

    case "fetch/user":
      return { ...state, isLoading: false, isLogin: true, user: payload.user };

    case "auth/logout":
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        user: null,
        error: "",
      };

    case "fetch/users":
      return { ...state, isLoading: false, error: "", users: payload };

    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "error":
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

export const UserContext = createContext();

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducers, initialState);

  async function fetchAPI(url, method = "GET", body) {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Token ${token}`;
    }

    const options = {
      method,
      headers,
      body: JSON.stringify(body),
    };

    const res = await fetch(url, options);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }

    return res.json();
  }

  const getAllUsers = async () => {
    dispatch({ type: "loading" });
    try {
      const res = await fetchAPI(`${API_BASE_URL}/users`);
      dispatch({ type: "fetch/users", payload: res });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const getUserInfo = async () => {
    dispatch({ type: "loading" });
    try {
      const res = await fetchAPI(`${API_BASE_URL}/user`);
      dispatch({ type: "fetch/user", payload: res });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserInfo();
      getAllUsers();
    }
  }, [state.isLogin]);

  const value = { state, dispatch, fetchAPI, getAllUsers, getUserInfo };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
