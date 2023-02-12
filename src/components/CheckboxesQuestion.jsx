import { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function CheckboxesQuestionEdit({
  number,
  text,
  options,
  handleQuestionChange,
  handleAnswerChange,
  isSubmitMode,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
      handleAnswerChange(number, undefined, [...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
      handleAnswerChange(
        number,
        undefined,
        selectedOptions.filter((option) => option !== value)
      );
    }
  };
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
        {options.map((option, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                value={option}
                disabled={!isSubmitMode}
                onChange={handleCheckboxChange}
                checked={selectedOptions.indexOf(option) > -1}
              />
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
              {!isSubmitMode && (
                <button
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
