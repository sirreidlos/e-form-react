import Title from "../components/Submission/Title";
import { Link } from "react-router-dom";
import { useState } from "react";
import CheckboxesQuestion from "../components/CheckboxesQuestion";
import Question from "../components/Question";
import { useRef } from "react";

export default function FormCreation() {
  const [showLogout, setShowLogout] = useState(false);
  const [formProperty, setFormProperty] = useState({
    title: "Untitled form",
    description: "",
    state: "Private",
  });
  const [questions, setQuestions] = useState([
    { number: 1, text: "Question", kind: "TextAnswer", options: null },
  ]);

  const bottomRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("SUBMIT CALLED");
    setShowLogout(!showLogout);
    // Submit the form, for example, by sending a POST request to the server with the answers array.
  };

  const handleQuestionChange = (number, text, kind, options = null) => {
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
        options: null,
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
      <div className="bg-gray-200 py-24">
        <div className="flex justify-center">
          <form className="max-w-3xl space-y-4" onSubmit={handleSubmit}>
            <Title
              title={formProperty.title}
              description={formProperty.description}
              handleFormProperty={handleFormProperty}
            />
            {questions.map((question) => (
              <Question
                key={question.number}
                number={question.number}
                text={question.text}
                kind={question.kind}
                options={question.options}
                handleChange={handleQuestionChange}
              ></Question>
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="invisible top-[120vh]" ref={bottomRef}></div>
    </>
  );
}
