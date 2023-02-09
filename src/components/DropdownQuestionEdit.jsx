import { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function DropdownQuestionEdit({
  number,
  text,
  options,
  handleChange,
}) {
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
        {options.map((option, index) => {
          return (
            <div key={index}>
              {/* <input type="checkbox" value={option} disabled /> */}
              {index}
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  let newOptions = options;
                  newOptions[index] = e.target.value;
                  handleChange(number, undefined, undefined, newOptions);
                }}
              />
              <button
                onClick={() => {
                  let newOptions = options;
                  newOptions.splice(index, 1);
                  handleChange(number, undefined, undefined, newOptions);
                }}
              >
                delete option
              </button>
            </div>
          );
        })}
        <div
          onClick={(e) => {
            console.log("CLICKED");
            let optionNumber = options.length + 1;
            handleChange(number, undefined, undefined, [
              ...options,
              `Option ${optionNumber}`,
            ]);
          }}
        >
          <button type="button">+ add another option</button>
        </div>
      </div>
    </>
  );
}
