import Title from "../components/Submission/Title";
import { useEffect, useState } from "react";
import QuestionEdit from "../components/QuestionEdit";
import { useRef } from "react";
import ApiClient from "../tools/ApiClient";
import html2canvas from "html2canvas";

export default function FormCreation() {
  const [showLogout, setShowLogout] = useState(false);
  const [formProperty, setFormProperty] = useState({
    title: "Untitled form",
    description: "",
    state: "Private",
  });
  const [questions, setQuestions] = useState([
    { number: 1, text: "Question", kind: "TextAnswer", options: ["Option 1"] },
  ]);
  const [answers, setAnswers] = useState([
    { number: 1, input: "Hello world." },
  ]);

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

  /**
   * Enum for form mode.
   * @readonly
   * @enum {{name: string, hex: string}}
   */
  const modes = Object.freeze({
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    SUBMIT: "SUBMIT",
  });
  const [mode, setMode] = useState(modes.CREATE);

  useEffect(() => {
    const modes = {
      CREATE: "CREATE",
      UPDATE: "UPDATE",
      SUBMIT: "SUBMIT",
    };
    const currentRoute = window.location.pathname;
    if (currentRoute.startsWith("/edit/")) {
      setMode(modes.UPDATE);
    }

    if (currentRoute.startsWith("/form/")) {
      setMode(modes.SUBMIT);
    }

    if (!currentRoute.startsWith("/new")) {
      const id = currentRoute.substring(6);
      ApiClient.get(`/form/${id}`).then((res) => {
        if (res.status !== 200) {
          showMessage("FAILURE", res.data.message);
          return;
        }

        setFormProperty({
          title: res.data.title,
          description: res.data.description,
          state: res.data.state,
        });

        setQuestions(res.data.questions);
      });
    }
  }, []);

  function showMessage(status, message) {
    setMessage({ status, message });
    setTimeout(() => {
      setMessage({ status: "", message: "" });
    }, 5000);
  }

  const bottomRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === modes.CREATE) {
      ApiClient.post("/form", { ...formProperty, questions })
        .then((res) => {
          if (res.status !== 201) {
            showMessage(statuses.FAILURE, res.data.message);
            return;
          }

          showMessage(statuses.SUCCESS, res.data.message);
        })
        .catch((err) => {
          showMessage(statuses.FAILURE, err.message);
        });

      return;
    }

    const currentRoute = window.location.pathname;
    const id = currentRoute.substring(6);

    if (mode === modes.SUBMIT) {
      ApiClient.post(`/form/${id}`, { answers: answers }).then((res) => {
        showMessage(statuses.SUCCESS, res.data.message);
        return;
      });
    }

    if (mode === modes.UPDATE) {
      let thumbnail_string = "";
      html2canvas(document.getElementById("content"), {
        height: 1080,
        scale: 0.25,
        backgroundColor: "#e5e7eb",
      }).then(function (canvas) {
        thumbnail_string = canvas.toDataURL("image/png").toString();
        ApiClient.put(`/form/${id}`, {
          ...formProperty,
          questions,
          thumbnail_string,
        })
          .then((res) => {
            if (res.status !== 200) {
              showMessage(statuses.FAILURE, res.data.message);
              return;
            }
            showMessage(statuses.SUCCESS, res.data.message);
            getThumbnail64String(res.data.id);
          })
          .catch((err) => {
            showMessage(statuses.FAILURE, err.message);
          });
      });
      // console.log(thumbnail_string);
    }
  };

  async function getThumbnail64String() {
    html2canvas(document.getElementById("content"), {
      height: 1080,
      scale: 0.25,
    }).then(function (canvas) {
      let myImage = canvas.toDataURL("image/png").toString();
      return myImage;
    });
  }

  const handleQuestionChange = (
    number,
    text,
    kind,
    options,
    deleteQuestion = false
  ) => {
    if (deleteQuestion === true) {
      let currentQuestions = questions;
      currentQuestions.splice(number - 1, 1);
      currentQuestions = currentQuestions.map((question, index) => {
        return {
          number: (question.number = index + 1),
          text: question.text,
          kind: question.kind,
          options: question.options,
        };
      });

      setQuestions(currentQuestions);
    }
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        console.log(number, text, kind, options);
        if (question.number === number) {
          return {
            number: number,
            text: text !== undefined ? text : question.text,
            kind: kind !== undefined ? kind : question.kind,
            options: options !== undefined ? options : question.options,
          };
        }

        return question;
      })
    );
  };

  const handleFormProperty = (title, description, state) => {
    setFormProperty((prevState) => {
      return {
        title: title !== undefined ? title : prevState.title,
        description:
          description !== undefined ? description : prevState.description,
        state: state !== undefined ? state : prevState.state,
      };
    });
  };

  const addNewQuestion = () => {
    setQuestions((prevQuestions) => {
      let number = prevQuestions.length + 1;
      let newQuestion = {
        number: number,
        text: "Question",
        kind: "TextAnswer",
        options: ["Option 1"],
      };
      return [...prevQuestions, newQuestion];
    });
  };

  const scrollToBottom = () => {
    // Delay made for the DOM to move the bottomRef before being scrolled into view.
    // Oddly enough, having timeout 0 still works.
    setTimeout(() => {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <>
      <header className="fixed bg-white py-2 px-4 max-h-16 flex w-screen justify-between drop-shadow">
        <div className="flex gap-24 justify-between items-center">
          <div className="w-max px-4 py-2 rounded-md">
            <input
              className="outline-none w-min flex grow shrink max-w-lg"
              type="text"
              value={formProperty.title}
              onChange={(e) => handleFormProperty(e.target.value)}
              onBlur={(e) => {
                e.target.classList.remove("border-b");
                e.target.classList.remove("border-gray-400");
                if (!formProperty.title) {
                  handleFormProperty(undefined, "Untitled form");
                }
              }}
              onFocus={(e) => {
                e.target.classList.add("border-b");
                e.target.classList.add("border-gray-400");
              }}
            />
          </div>
        </div>

        {showLogout ? <div>todo!("LOGOUT")</div> : ""}
        <div
          className="cursor-pointer"
          onClick={() => setShowLogout((showLogout) => !showLogout)}
          tabIndex="0"
          role="button"
        >
          <img className=" aspect-square h-full" src="/user.png" alt="user" />
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

      <div id="content" className="bg-gray-200 py-24">
        <div className="flex justify-center">
          <form className="max-w-3xl space-y-4" onSubmit={handleSubmit}>
            <Title
              title={formProperty.title}
              description={formProperty.description}
              handleFormProperty={handleFormProperty}
            />
            {questions.map((question) => (
              <QuestionEdit
                key={question.number}
                number={question.number}
                text={question.text}
                kind={question.kind}
                options={question.options}
                handleChange={handleQuestionChange}
              ></QuestionEdit>
            ))}
            <div className="flex justify-between">
              <button
                className="bg-white text-gray-400 p-2 rounded-lg hover:bg-gray-100 hover:text-gray-400"
                onClick={() => {
                  addNewQuestion();
                  scrollToBottom();
                }}
                type="button"
              >
                Add new question.
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400 "
                type="submit"
              >
                {mode === modes.CREATE ? "Create" : ""}
                {mode === modes.SUBMIT ? "Submit" : ""}
                {mode === modes.UPDATE ? "Update" : ""}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="invisible top-[120vh]" ref={bottomRef}></div>
    </>
  );
}
