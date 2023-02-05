import { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function TextAnswerQuestionEdit({ number, text, handleChange }) {
  // const [question, setQuestion] = useState("Question");

  const questionType = {
    TextAnswer: "TextAnswer",
    MultipleChoice: "MultipleChoice",
    Checkboxes: "Checkboxes",
    Dropdown: "Dropdown",
    Date: "Date",
    Time: "Time",
  };

  return (
    <>
      <div className="space-y-2">
        <input
          type="text"
          className="text-2xl w-full bg-transparent border-b border-gray-300 py-2 outline-none "
          onChange={(e) => {
            handleChange(number, e.target.value);
          }}
          defaultValue="Question"
        />
        <TextareaAutosize
          disabled
          className="w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
          placeholder="Text answer"
        />
      </div>
    </>
  );
}
