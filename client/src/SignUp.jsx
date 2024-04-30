import { useForm } from "react-hook-form";
import { useUserContext, API_BASE_URL } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const { fetchAPI, dispatch, state } = useUserContext();
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    dispatch({ type: "loading" });

    try {
      const response = await fetchAPI(`${API_BASE_URL}/signup`, "POST", data);
      dispatch({
        type: "auth/login",
        payload: { user: response?.user, token: response?.token },
      });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  useEffect(() => {
    // Clear error state when navigating to the signup page
    dispatch({ type: "error", payload: "" });
  }, []);

  useEffect(() => {
    if (state.isLogin) navigate("/");
  }, [state.isLogin]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {state.isLoading && (
        <div className="mr-auto max-w-screen-sm rounded-md bg-blue-400 px-3 py-1 text-sm text-blue-50">
          we are using free trial from render,{" "}
          <strong className="text-base">sometimes</strong> respone may delay
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up to new Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {state.error && (
          <div className="mb-3 w-9/12 rounded-md bg-red-400 p-2 text-base text-red-100">
            {state.error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                {...register("name")}
                id="name"
                name="name"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Position
            </label>
            <div className="mt-2">
              <input
                {...register("position")}
                id="position"
                name="position"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={state.isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Have an Account ? &nbsp;
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
