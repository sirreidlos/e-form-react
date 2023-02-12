import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Thumbnail from "../components/Thumbnail";
import ApiClient from "../tools/ApiClient";

export default function Main() {
  const [showLogout, setShowLogout] = useState(false);
  const [forms, setForms] = useState([]);
  useEffect(() => {
    ApiClient.get("/forms").then((res) => {
      setForms(res.data.form);
    });
  }, []);
  const navigate = useNavigate();

  function createNewForm() {
    ApiClient.post("/form", {
      title: "Untitled form",
      description: "",
      state: "Private",
      questions: [
        {
          number: 1,
          text: "Question",
          kind: "TextAnswer",
          options: null,
        },
      ],
    }).then((res) => {
      if (res.status === 201) {
        navigate(`/edit/${res.data.id}`);
      }
    });
  }

  return (
    <>
      <header className="fixed bg-white py-2 px-4 flex w-screen justify-between">
        <Link to="/">
          <img src="/E-Form.png" alt="e form" />
        </Link>
        <div className="flex gap-24 justify-between items-center">
          <div className="bg-gray-200 w-[48rem] px-4 py-2 rounded-md">
            <input
              className="bg-gray-200 w-full outline-none"
              type="text"
              placeholder="Telusuri di Drive atau tempel URL"
            />
          </div>
          <div className="text-2xl hover:text-gray-600">
            <a href="/templates">Gallery Template</a>
          </div>
        </div>

        {showLogout ? <div>todo!("LOGOUT")</div> : ""}
        <div
          className="cursor-pointer pointer-events-none"
          onClick={() => setShowLogout((showLogout) => !showLogout)}
          tabIndex="0"
          role="button"
        >
          <img src="/user.png" alt="user" />
        </div>
      </header>

      <div className="bg-gray-200 px-48 pt-20 pb-6 space-y-4">
        <div className="text-2xl">Start a new form</div>
        <div className="flex justify-between">
          <div
            className="flex flex-col space-y-1 cursor-pointer"
            onClick={createNewForm}
          >
            <img
              src="new-form.png"
              className="rounded-xl w-64 h-36 border border-gray-300"
              alt="new-form.png"
            />
            <div>
              <p className="text-lg">Create new</p>
            </div>
          </div>

          <Thumbnail
            title={"Introduction Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Green Hill Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Customer Center Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
        </div>
      </div>
      <div className="bg-white px-48 py-6 space-y-4 min-h-[69vh]">
        <div className="text-2xl">Recent forms</div>
        <div className="grid grid-cols-[repeat(5,_minmax(0,_16rem))] justify-between gap-y-6">
          {/* <Thumbnail
            title={"Introduction Survey"}
            link={"/new"}
            image={"form1.png"}
            date="17 January 2021"
          /> */}
          {forms.map((form) => {
            return (
              <Thumbnail
                title={form.title}
                link={"/edit/" + form._id}
                thumbnail_string={form.thumbnail_string}
                key={form._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
