export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    console.log(values);
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
            <input
              type="text"
              name="username"
              className="w-96"
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              className="w-96"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              className="w-96"
              placeholder="Password"
            />
          </div>
          <p>
            If you don’t have an account.{" "}
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 font-bold"
              href={`/register`}
            >
              Register Here
            </a>
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
