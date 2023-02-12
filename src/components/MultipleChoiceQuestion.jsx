import { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function MultipleChoiceQuestionEdit({
  number,
  text,
  options,
  handleQuestionChange,
  handleAnswerChange,
  isSubmitMode,
}) {
  return (
    <>
      <div className="space-y-2">
        <TextareaAutosize
          type="text"
          className="text-2xl w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
          onChange={(e) => {
            handleQuestionChange(number, e.target.value);
          }}
          value={text}
          placeholder="Question"
          disabled={isSubmitMode}
        />
        <fieldset>
          {options.map((option, index) => {
            return (
              <div key={index}>
                <input
                  type="radio"
                  value={option}
                  disabled={!isSubmitMode}
                  name={number}
                  id={`${number}${index}`}
                  onClick={(e) => {
                    handleAnswerChange(number, e.target.value, undefined);
                  }}
                />
                <label htmlFor={`${number}${index}`}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      let newOptions = options;
                      newOptions[index] = e.target.value;
                      handleQuestionChange(
                        number,
                        undefined,
                        undefined,
                        newOptions
                      );
                    }}
                    disabled={isSubmitMode}
                  />
                </label>
                {!isSubmitMode && (
                  <button
                    type="button"
                    onClick={() => {
                      let newOptions = options;
                      newOptions.splice(index, 1);
                      handleQuestionChange(
                        number,
                        undefined,
                        undefined,
                        newOptions
                      );
                    }}
                  >
                    delete option
                  </button>
                )}
              </div>
            );
          })}
        </fieldset>
        {!isSubmitMode && (
          <div
            onClick={(e) => {
              let optionNumber = options.length + 1;
              handleQuestionChange(number, undefined, undefined, [
                ...options,
                `Option ${optionNumber}`,
              ]);
            }}
          >
            <button type="button">+ add another option</button>
          </div>
        )}
      </div>
    </>
  );
}
