import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Thumbnail from "../components/Thumbnail";
import ApiClient from "../tools/ApiClient";
import LocalStorage from "../tools/LocalStorage";

export default function Main() {
  const [showLogout, setShowLogout] = useState(false);
  const [forms, setForms] = useState([]);
  const [templates, setTemplates] = useState([]);

  const displayMode = Object.freeze({
    FORM: "FORM",
    TEMPLATE: "TEMPLATE",
  });
  const [display, setDisplay] = useState(displayMode.FORM);
  useEffect(() => {
    ApiClient.get("/forms").then((res) => {
      setForms(res.data.form);
    });

    ApiClient.get("/templates").then((res) => {
      setTemplates(res.data);
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

  function createFormWithTemplate(templatesIndex) {
    const templateId = templates[templatesIndex]._id;
    ApiClient.get(`/template/${templateId}`).then((res) => {
      if (res.status !== 200) {
        return;
      }

      ApiClient.post("/form", {
        title: res.data.title,
        description: res.data.description,
        state: "Private",
        questions: res.data.questions,
      }).then((res) => {
        if (res.status === 201) {
          navigate(`/edit/${res.data.id}`);
        }
      });
    });
  }

  /**
   * Enum for message status.
   * @readonly
   * @enum {{name: string, hex: string}}
   */
  const statuses = Object.freeze({
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    WARNING: "WARNING",
  });
  const [message, setMessage] = useState({
    status: "",
    message: "",
  });

  function showMessage(status, message) {
    setMessage({ status, message });
    setTimeout(() => {
      setMessage({ status: "", message: "" });
    }, 5000);
  }

  function updateFormsAfterDelete(formId) {
    setForms((prevForms) => {
      return prevForms.filter((form) => form._id !== formId);
    });
    console.log(forms.filter((form) => form._id !== formId));
  }

  return (
    <>
      <header className="fixed  bg-white py-2 px-4 flex w-screen justify-between drop-shadow-md hover:drop-shadow-xl">
        {display === displayMode.FORM && (
          <Link to="/">
            <img
              class="relative h-17 w-21 top-2 "
              src="/E-Form.png"
              alt="e form"
            />
          </Link>
        )}
        {display === displayMode.TEMPLATE && (
          <button onClick={() => setDisplay(displayMode.FORM)}>{"Back"}</button>
        )}
        <div className="flex gap-24 justify-between items-center"></div>

        <form className="max-w-sm px-4 ">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className=" w-4/3  py-3 pl-12 pr-4 text-gray-500 border rounded-lg outline-none bg-gray-50 focus:bg-white focus:border-indigo-500"
            />
          </div>
        </form>

        {showLogout ? (
          <div className="flex justify-center fixed">
            <div className="right-4 top-[4.5rem] fixed">
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-lg drop-shadow-lg"
                onClick={() => {
                  LocalStorage.delToken();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          className="cursor-pointer"
          onClick={() => setShowLogout((showLogout) => !showLogout)}
          tabIndex="0"
          role="button"
        >
          <img src="user.png" alt="user" />
        </div>
      </header>

      {message.message ? (
        <div className="flex justify-center fade-in fade-out">
          {message.status === statuses.SUCCESS ? (
            <div className="fixed bg-green-400 m-8 py-4 px-8 rounded-lg text-white">
              {message.message}
            </div>
          ) : (
            <div className="fixed bg-red-400 m-8 py-4 px-8 rounded-lg text-white">
              {message.message}
            </div>
          )}
        </div>
      ) : (
        ""
      )}

      {display === displayMode.FORM && (
        <div className="bg-gray-100 px-48 pt-20 pb-6 space-y-2">
          <div className="flex justify-between">
            <div className="text-gray-800 font-sans font-medium text-2xl">
              Start a new form
            </div>
            <button
              className="text-gray-800 font-medium text-2xl"
              type="button"
              onClick={() => setDisplay(displayMode.TEMPLATE)}
            >
              Gallery Template
            </button>
          </div>
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
                <p className="font-medium ">Create new</p>
              </div>
            </div>

            {templates.slice(0, 4).map((template, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col space-y-1 cursor-pointer"
                  onClick={() => {
                    createFormWithTemplate(index);
                  }}
                >
                  <img
                    src={template.thumbnail_string}
                    className="rounded-xl w-64 h-36 border border-gray-300"
                    alt={template._id}
                  />
                  <div>
                    <p className="text-lg">{template.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="bg-white px-48 py-6 space-y-4 min-h-sreen h-screen">
        <div className="text-2xl">
          {display === displayMode.FORM ? "Recent forms" : "Template Gallery"}
        </div>
        <div className="grid grid-cols-[repeat(5,_minmax(0,_16rem))] justify-between gap-y-6">
          {display === displayMode.FORM &&
            forms.map((form) => {
              return (
                <Thumbnail
                  id={form._id}
                  title={form.title}
                  link={"/edit/" + form._id}
                  thumbnail_string={form.thumbnail_string}
                  key={form._id}
                  showMessage={showMessage}
                  updateHandler={updateFormsAfterDelete}
                />
              );
            })}
          {display === displayMode.TEMPLATE &&
            templates.map((template, index) => {
              return (
                <div
                  className="flex flex-col space-y-1 cursor-pointer"
                  onClick={() => {
                    createFormWithTemplate(index);
                  }}
                >
                  <img
                    src={template.thumbnail_string}
                    className="rounded-xl w-64 h-36 border border-gray-300"
                    alt={template._id}
                  />
                  <div>
                    <p className="text-lg">{template.title}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
