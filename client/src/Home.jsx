import React, { useEffect } from "react";
import UsersTable from "./Table";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

function Home() {
  const { state } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isLogin) navigate("/");
  }, [state.isLogin]);

  return (
    <div>
      {state.isLoading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur-md backdrop-filter">
          <div className="flex items-center space-x-4 rounded-lg bg-gray-900 bg-opacity-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-8 py-4 text-white">
            <svg
              className="h-6 w-6 animate-spin text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8h-2c0-3.314-2.686-6-6-6s-6 2.686-6 6H4z"
              ></path>
            </svg>
            <span className="text-lg">Loading...</span>
          </div>
        </div>
      )}

      <Navbar />
      <UsersTable />
    </div>
  );
}

export default Home;
