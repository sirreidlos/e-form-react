import { useState } from "react";
import ApiClient from "../tools/ApiClient";
import LocalStorage from "../tools/LocalStorage";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    ApiClient.post("/login", values)
      .then((res) => {
        console.log(res.data);
        if (res.status !== 200) {
          return;
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
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(setError, 5000, "");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="p-16 h-[36rem] flex-col flex gap-y-8 items-center bg-white rounded-2xl">
        <img src="/E-Form.png" alt="e form" />
        <h1 className="text-3xl font-bold">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-6 [&>input]:border-b-2"
        >
          <div className="flex flex-col gap-y-4 [&>input]:border-b-2">
            {/* <input
              type="text"
              name="username"
              className="w-96"
              placeholder="Username"
              required
            /> */}
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
          </div>
          {error ? <p className="text-red-600">{error}</p> : ""}
          <p>
            If you don’t have an account.{" "}
            <Link
              to="/register"
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 font-bold"
            >
              Register Here
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
    </div>
  );
}
