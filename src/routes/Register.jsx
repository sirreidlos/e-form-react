import { useState } from "react";
import ApiClient from "../tools/ApiClient";
import LocalStorage from "../tools/LocalStorage";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    if (values.password !== values.confirm_password) {
      setError("Password mismatch");
      setTimeout(setError, 5000, "");
      return;
    }

    delete values.confirm_password;

    ApiClient.post("/register", values)
      .then((res) => {
        if (res.status !== 201) {
          showError(`Error: ${res.data.message}`);
        }

        if (!res.data.token) {
          showError("Error: No token.");
          return;
        }

        LocalStorage.setToken(res.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          showError(`Error: ${err.response.data.message}`);
        } else {
          showError("An unexpected error has occured.");
          console.log(err);
        }
      });
    console.log(values);
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(setError, 5000, "");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div class="p-16 h-[38rem] flex-col flex gap-y-8 items-center absolute bg-gradient-to-r w-[32rem]  from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-12 sm:rounded-3xl left-96"></div>
      <div className="p-16 h-[36rem] flex-col flex gap-y-8 items-center justify-center bg-white rounded-2xl absolute left-96">
        <img src="/E-Form.png" alt="e form" />
        <h1 className="text-3xl font-bold">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-6 [&>input]:border-b-2"
        >
          <div className="flex flex-col gap-y-6 [&>input]:border-b-2">
            <input
              type="text"
              name="username"
              className="w-96"
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="email"
              className="w-96"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              className="w-96"
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="confirm_password"
              className="w-96 "
              placeholder="Confirm Password"
              required
            />
          </div>
          {error ? <p className="text-red-600">{error}</p> : ""}
          <p>
            If you already have an account.{" "}
            <Link
              to="/login"
              className="underline text-blue-600 hover:text-blue-800 visited:text-sky-600 font-bold"
            >
              Login Here
            </Link>
            .
          </p>
          <button
            className="bg-sky-600 text-white p-3 font-bold rounded-lg"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <img src="brown.jpg" className="w-screen h-screen" alt="bg.jpg" />
    </div>
  );
}
