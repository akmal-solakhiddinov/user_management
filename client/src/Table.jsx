import { useState } from "react";
import { useUserContext, API_BASE_URL } from "./UserContext";
import { FaLock, FaTrash, FaUnlock } from "react-icons/fa";

function UsersTable() {
  const { fetchAPI, state, getAllUsers } = useUserContext();
  const [checkedUsers, setCheckedUsers] = useState([]);

  const handleChecked = (id) => {
    setCheckedUsers((prev) => [...prev, id]);
  };

  const handleStatus = async (userStatus) => {
    if (!checkedUsers.length) return;
    try {
      await fetchAPI(`${API_BASE_URL}/users/update`, "POST", {
        usersId: checkedUsers,
        userStatus,
      });
      getAllUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDeleteUsers = async () => {
    try {
      if (!checkedUsers.length) return;
      await fetchAPI(`${API_BASE_URL}/users/delete`, "POST", {
        usersId: checkedUsers,
      });
      getAllUsers();
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="flex w-full justify-start gap-6  py-3 ">
        <button
          onClick={() => handleStatus("blocked")}
          className="flex items-center gap-2 rounded-md bg-red-50 px-5  py-2 shadow-md"
        >
          {" "}
          <FaLock className=" text-2xl text-red-600" /> Block
        </button>
        <button
          onClick={() => handleStatus("active")}
          className="flex items-center gap-2 rounded-md bg-green-50 px-5  py-2 shadow-md"
        >
          {" "}
          <FaUnlock className=" text-2xl text-green-700" /> Unblock
        </button>
        <button
          onClick={handleDeleteUsers}
          className="flex items-center gap-2 rounded-md bg-red-50 px-5  py-2 shadow-md"
        >
          <FaTrash className=" text-2xl text-red-600" />
          Delete
        </button>
      </div>
      <div className="h-full w-full rounded-sm border border-gray-300">
        <div className="grid grid-cols-[50px,1fr,1fr,1fr,150px] items-center divide-x divide-gray-300 border-b text-center">
          <label className="flex items-center justify-center">
            <div className="flex h-5 w-5 items-center justify-center rounded-l-sm border border-gray-300">
              --
            </div>
          </label>
          <div>
            <h1 className="font-medium capitalize">Name</h1>
            <h2>Position</h2>
          </div>
          <div>Email</div>
          <div>Last login</div>
          <div>Status</div>
        </div>
        {state.users.map((user) => (
          <div
            key={user.id}
            className={`grid grid-cols-[50px,1fr,1fr,1fr,150px] items-center divide-x divide-gray-300 border-b border-gray-300 text-center ${
              user.status === "blocked" ? "bg-gray-200" : ""
            }`}
          >
            <label className="flex items-center justify-center">
              <input type="checkbox" onChange={() => handleChecked(user.id)} />
            </label>
            <div>
              <h1 className="font-medium capitalize">{user.name}</h1>
              <h2>{user.position}</h2>
            </div>
            <div>{user.email}</div>
            <div>
              <div>
                {user.lastLogin ? (
                  <div>{new Date(user.lastLogin).toLocaleString()}</div>
                ) : (
                  <div>{new Date(user.regestrationTime).toLocaleString()}</div>
                )}
              </div>
            </div>

            <div className="px-1 md:px-3">
              <h3
                className={`rounded-md px-2 py-1 capitalize md:px-3 md:text-xl ${
                  user.status === "active"
                    ? "bg-green-600 text-green-100"
                    : "bg-red-600 text-red-100"
                }`}
              >
                {user.status}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersTable;
