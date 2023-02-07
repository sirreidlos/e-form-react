import { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function TextAnswerQuestionEdit({ number, text, handleChange }) {
  // const [question, setQuestion] = useState("Question");

  return (
    <>
      <div className="space-y-2">
        <TextareaAutosize
          type="text"
          className="text-2xl w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
          onChange={(e) => {
            handleChange(number, e.target.value);
          }}
          value={text}
          placeholder="Question"
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
