import Title from "../components/Title";
import { useEffect, useState } from "react";
import Question from "../components/Question";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../tools/ApiClient";
import html2canvas from "html2canvas";
import LocalStorage from "../tools/LocalStorage";

export default function Form() {
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);
  const [formProperty, setFormProperty] = useState({
    title: "Untitled form",
    description: "",
    state: "Private",
  });
  const [questions, setQuestions] = useState([
    { number: 1, text: "Question", kind: "TextAnswer", options: ["Option 1"] },
  ]);
  const [answers, setAnswers] = useState([]);

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

    function showMessageAndRedirect(status, message, redirectTo = undefined) {
      setMessage({ status, message });
      setTimeout(() => {
        setMessage({ status: "", message: "" });
        if (redirectTo) {
          navigate(redirectTo);
        } else {
          navigate(-1);
        }
      }, 5000);
    }

    if (!currentRoute.startsWith("/new")) {
      const id = currentRoute.substring(6);
      ApiClient.get(`/form/${id}`)
        .then((res) => {
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

          setAnswers(() => {
            return res.data.questions.map((question) => {
              return {
                number: question.number,
                input:
                  question.kind === "Dropdown"
                    ? question.options[0]
                    : undefined,
                selected_options: undefined,
              };
            });
          });
        })
        .catch((err) => {
          showMessageAndRedirect("FAILURE", err.message);
        });
    }
  }, [navigate]);

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
      ApiClient.post(`/response/${id}`, { answers: answers })
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
    }
  };

  async function getThumbnail64String() {
    html2canvas(document.getElementById("content"), {
      height: 1080,
      scale: 0.25,
      logging: false,
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

  function handleAnswerChange(number, input, selected_options) {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) => {
        if (answer.number === number) {
          return {
            number: number,
            input: input !== undefined ? input : answer.input,
            selected_options:
              selected_options !== undefined
                ? selected_options
                : answer.selected_options,
          };
        }

        return answer;
      })
    );
  }

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
              disabled={mode === modes.SUBMIT}
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

        <div className="flex gap-6">
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
          {mode === modes.UPDATE && (
            <>
              <a
                className="flex items-center bg-blue-500 px-4 text-white rounded-xl"
                href={`/response/${window.location.pathname.substring(6)}`}
              >
                <span>Check Responses</span>
              </a>
              <button
                type="button"
                className="bg-blue-500 px-4 text-white rounded-xl"
                onClick={() => {
                  var link = `${
                    window.location.origin
                  }/form/${window.location.pathname.substring(6)}`;
                  console.log(link);
                  navigator.clipboard.writeText(link);
                  showMessage(statuses.SUCCESS, "Link Copied.");
                }}
              >
                Copy Form Link
              </button>
            </>
          )}

          <div
            className="cursor-pointer"
            onClick={() => setShowLogout((showLogout) => !showLogout)}
            tabIndex="0"
            role="button"
          >
            <img className=" aspect-square h-full" src="/user.png" alt="user" />
          </div>
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
              isSubmitMode={mode === modes.SUBMIT}
            />
            {questions.map((question) => (
              <Question
                key={question.number}
                number={question.number}
                text={question.text}
                kind={question.kind}
                options={question.options}
                handleQuestionChange={handleQuestionChange}
                handleAnswerChange={handleAnswerChange}
                isSubmitMode={mode === modes.SUBMIT}
              ></Question>
            ))}
            <div className="flex justify-between">
              {mode !== modes.SUBMIT ? (
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
              ) : (
                ""
              )}

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
