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
    // <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
    //   <div
		// 	class="p-16 h-[37rem] flex-col flex gap-y-8 items-center absolute bg-gradient-to-r w-[32rem]  from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-12 sm:rounded-3xl left-96">
		// </div> 
    //   <div className="p-16 h-[36rem] flex-col flex gap-y-8 items-center justify-center bg-white rounded-2xl absolute left-96">
    <div className="min-h-screen bg-gray-200">
    <div className="container mx-auto">
      <div className="flex w-8/12 bg-white absolute rounded-xl mx-auto shadow-lg overflow-hidden">
    <div className="p-16 h-[36rem] flex-col flex gap-y-8 items-center bg-white rounded-2xl w-1/2">
        <img src="/E-Form.png" alt="e form" />
        <h1 className="text-3xl font-bold">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-6 [&>input]:border-b-2"
        >
          <div className="flex flex-col gap-y-8 [&>input]:border-b-2">
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
              className="underline text-blue-600 hover:text-blue-800 visited:text-sky-600 font-bold"
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
      <div className=" bg-gradient-to-bl from-orange-400 to-yellow-300 p-16 h-[36rem] text-white text-2xl text-center flex-col flex gap-y-8 items-center justify-center w-1/2">
        <h1>Welcome</h1>
        <p>Making your surveying easier</p>
      
      </div>
      </div>
      </div>
      <img
    src="bg.jpg"
    className="w-screen h-screen"
    alt="bg.jpg"
    />
    </div>
  );
}
