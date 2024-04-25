import { useUserContext } from "./UserContext";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  const { state, dispatch } = useUserContext();

  return (
    <nav className="flex flex-row items-center justify-end bg-slate-500 px-4 py-2 text-white">
      <h1 className="capitalize">Hello, {state.user.name}</h1> &nbsp;| &nbsp;{" "}
      <button
        className="flex items-center gap-2 rounded-md   py-2 "
        onClick={() => dispatch({ type: "auth/logout" })}
      >
        Logout
        <FiLogOut className=" text-2xl " />
      </button>
    </nav>
  );
}

export default Navbar;
