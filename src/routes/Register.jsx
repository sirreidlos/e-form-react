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
    <div className="min-h-screen py-40 bg-gradient-to-b from-yellow-400 via-red-500 to-pink-500">
      <div className="container mx-auto">
        <div className="flex w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
      <div className="p-16 h-[36rem] flex-col flex gap-y-8 items-center bg-white rounded-2xl w-1/2">
        <img src="/E-Form.png" alt="e form" />
        <h1 className="text-3xl font-bold">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-6 [&>input]:border-b-2"
          >
          <div className="flex flex-col gap-y-4 [&>input]:border-b-2 opacity-75">
            <input
              type="text"
              name="username"
              className="w-96 rounded"
              placeholder="Username"
              required
              />
            <input
              type="email"
              name="email"
              className="w-96 rounded"
              placeholder="Email"
              required
              />
            <input
              type="password"
              name="password"
              className="w-96 rounded"
              placeholder="Password"
              required
              />
            <input
              type="password"
              name="confirm_password"
              className="w-96 rounded"
              placeholder="Confirm Password"
              required
              />
          </div>
          {error ? <p className="text-red-600">{error}</p> : ""}
          <p>
            If you already have an account.{" "}
            <Link
              to="/login"
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 font-bold"
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
      <div className=" bg-gradient-to-r from-orange-400 to-yellow-300 p-16 h-[36rem] text-white text-3xl text-center flex-col flex gap-y-8 items-center justify-center w-1/2">
        <h1>Welcome</h1>
        <p>Today is the new era for creation</p>
      </div>
      {/* <img
      src="brown.jpg"
      className="w-screen h-screen"
      alt="bg.png.jpg"
      ></img> */}
      </div>
      </div>
    </div>
  );
}
