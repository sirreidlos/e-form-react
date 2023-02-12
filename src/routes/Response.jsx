import { useState } from "react";
import { useEffect } from "react";
import ApiClient from "../tools/ApiClient";
import LocalStorage from "../tools/LocalStorage";
import { fetchEventSource } from "@microsoft/fetch-event-source";

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
  const [responses, setResponses] = useState([]);

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

      console.log("REQUESTED FOR FORM");
      ApiClient.get(`/response/${formId}`)
        .then((res) => {
          if (res.status !== 200) {
            showMessage("FAILURE", res.data.message);
            return;
          }

          console.log("REQUESTED FOR RESPONSES");

          setResponses(res.data);
          const token = LocalStorage.getToken();

          fetchEventSource(`http://127.255.255.1/stream/${formId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            onmessage(ev) {
              console.log(ev.data);
              setResponses((prevResponses) => {
                return [...prevResponses, JSON.parse(ev.data)];
              });
            },
          });

          //   console.log(token);
          //   var eventSourceInitDict = {
          //     headers: { Authorization: `Bearer ${token}` },
          //   };
          //   const source = new EventSource(
          //     `http://127.255.255.1/stream/${formId}`,
          //     eventSourceInitDict
          //   );

          //   source.onmessage((e) => {
          //     console.log(e);
          //   });
          //   ApiClient.get(`/stream/${formId}`, { responseType: "text" })
          //     .then((res) => {
          //       const source = new EventSource(res.request.responseURL, {
          //         headers: res.request.getAllResponseHeaders(),
          //       });
          //       console.log("source");

          //       source.onmessage = (event) => {
          //         console.log(`Received SSE ${event.data}`);
          //       };
          //     })
          //     .catch((err) => {
          //       showMessage("FAILURE", err.message);
          //     });
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
      {responses.map((response, index) => {
        return (
          <div key={index}>
            <div>{response._id}</div>
            <div>{response.responder}</div>
          </div>
        );
      })}
    </>
  );
}
