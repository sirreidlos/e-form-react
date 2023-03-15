import { useState } from "react";
import { useEffect } from "react";
import ApiClient from "../tools/ApiClient";
import LocalStorage from "../tools/LocalStorage";
import { EventSourcePolyfill } from "event-source-polyfill";

import QuestionResponse from "../components/response/QuestionResponse";
import TitleResponse from "../components/response/TitleResponse";

export default function Response() {
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
  const [message, setMessage] = useState("");

  const [showLogout, setShowLogout] = useState(false);
  const [formProperty, setFormProperty] = useState({
    title: "Untitled form",
    description: "",
    state: "Private",
  });
  const [questions, setQuestions] = useState([
    { number: 1, text: "Question", kind: "TextAnswer", options: ["Option 1"] },
  ]);
  const [responses, setResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState({});

  useEffect(() => {
    const formId = window.location.pathname.substring(10);
    ApiClient.get(`/form/${formId}`).then((res) => {
      const formId = window.location.pathname.substring(10);
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
      ApiClient.get(`/response/${formId}`)
        .then((res) => {
          if (res.status !== 200) {
            showMessage("FAILURE", res.data.message);
            return;
          }

          console.log("REQUESTED FOR RESPONSES");

          setResponses(res.data);
          setCurrentResponse({ idx: 0, ...res.data[0] });

          const token = LocalStorage.getToken();

          const evtSrc = new EventSourcePolyfill(
            `http://127.255.255.1/stream/${formId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          evtSrc.addEventListener("message", (ev) => {
            const data = JSON.parse(ev.data);
            setResponses((prevResponses) => {
              if (prevResponses[prevResponses.length - 1]._id === data._id) {
                return prevResponses;
              }
              return [...prevResponses, JSON.parse(ev.data)];
            });
          });
        })
        .catch((err) => {
          showMessage("FAILURE", err.message);
        });
    });
  }, []);

  function showMessage(status, message) {
    setMessage({ status, message });
    setTimeout(() => {
      setMessage({ status: "", message: "" });
    }, 5000);
  }

  return (
    <>
      <header className="fixed bg-white py-2 px-4 max-h-16 flex w-screen justify-between drop-shadow">
        <div className="flex gap-24 justify-between items-center">
          <div className="w-max px-4 py-2 rounded-md">
            <input
              className="outline-none w-min flex grow shrink max-w-lg"
              type="text"
              disabled
              value={formProperty.title}
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

      <div id="content" className="py-24">
        <div className="flex justify-center">
          <div className="max-w-3xl space-y-4">
            {responses.length > 0 ? (
              <>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentResponse.idx - 1 < 0) {
                        setCurrentResponse({
                          idx: responses.length - 1,
                          ...responses[responses.length - 1],
                        });
                        return;
                      }

                      setCurrentResponse({
                        idx: currentResponse.idx - 1,
                        ...responses[currentResponse.idx - 1],
                      });
                    }}
                  >
                    prev
                  </button>
                  {currentResponse.idx + 1}/{responses.length}
                  <button
                    type="button"
                    onClick={() => {
                      if (currentResponse.idx + 1 >= responses.length) {
                        setCurrentResponse({
                          idx: 0,
                          ...responses[0],
                        });
                        return;
                      }

                      setCurrentResponse({
                        idx: currentResponse.idx + 1,
                        ...responses[currentResponse.idx + 1],
                      });
                    }}
                  >
                    next
                  </button>
                </div>
                <TitleResponse
                  title={formProperty.title}
                  description={formProperty.description}
                />
              </>
            ) : (
              "No responses found"
            )}
            {currentResponse.answers &&
              questions.map((question, idx) => (
                <QuestionResponse
                  key={question.number}
                  number={question.number}
                  text={question.text}
                  kind={question.kind}
                  options={question.options}
                  answer={currentResponse.answers[idx]}
                  responseId={currentResponse._id}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
