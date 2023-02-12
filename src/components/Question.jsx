import { useState } from "react";

import CheckboxesQuestion from "./CheckboxesQuestion";
import TextAnswerQuestion from "./TextAnswerQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import DropdownQuestion from "./DropdownQuestion";
import TimeQuestion from "./TimeQuestion";
import DateQuestion from "./DateQuestion";
import { useEffect } from "react";

export default function Question({
  number,
  text,
  kind,
  options,
  handleQuestionChange,
  handleAnswerChange,
  isSubmitMode = false,
}) {
  const questionType = {
    TextAnswer: "TextAnswer",
    MultipleChoice: "MultipleChoice",
    Checkboxes: "Checkboxes",
    Dropdown: "Dropdown",
    Date: "Date",
    Time: "Time",
  };

  useEffect(() => {
    if (!options) {
      handleQuestionChange(number, undefined, undefined, ["Option 1"]);
    }
  }, [handleQuestionChange, number, options]);

  return (
    <>
      <div className="bg-white rounded-lg p-8 space-y-8">
        {kind === questionType.TextAnswer && (
          <TextAnswerQuestion
            number={number}
            text={text}
            handleQuestionChange={handleQuestionChange}
            handleAnswerChange={handleAnswerChange}
            isSubmitMode={isSubmitMode}
          />
        )}
        {kind === questionType.MultipleChoice && (
          <MultipleChoiceQuestion
            number={number}
            text={text}
            options={options}
            handleQuestionChange={handleQuestionChange}
            handleAnswerChange={handleAnswerChange}
            isSubmitMode={isSubmitMode}
          />
        )}
        {kind === questionType.Checkboxes && (
          <CheckboxesQuestion
            number={number}
            text={text}
            options={options}
            handleQuestionChange={handleQuestionChange}
            handleAnswerChange={handleAnswerChange}
            isSubmitMode={isSubmitMode}
          />
        )}
        {kind === questionType.Dropdown && (
          <DropdownQuestion
            number={number}
            text={text}
            options={options}
            handleQuestionChange={handleQuestionChange}
            handleAnswerChange={handleAnswerChange}
            isSubmitMode={isSubmitMode}
          />
        )}
        {kind === questionType.Date && (
          <DateQuestion
            number={number}
            text={text}
            handleQuestionChange={handleQuestionChange}
            handleAnswerChange={handleAnswerChange}
            isSubmitMode={isSubmitMode}
          />
        )}
        {kind === questionType.Time && (
          <TimeQuestion
            number={number}
            text={text}
            handleQuestionChange={handleQuestionChange}
            handleAnswerChange={handleAnswerChange}
            isSubmitMode={isSubmitMode}
          />
        )}
        {!isSubmitMode && (
          <>
            <select
              value={kind}
              className="p-2 rounded-md"
              onChange={(e) => {
                handleQuestionChange(number, undefined, e.target.value);
              }}
            >
              <option value={questionType.TextAnswer}>Text Answer</option>
              <option value={questionType.MultipleChoice}>
                Multiple Choice
              </option>
              <option value={questionType.Checkboxes}>Checkboxes</option>
              <option value={questionType.Dropdown}>Dropdown</option>
              <option value={questionType.Date}>Date</option>
              <option value={questionType.Time}>Time</option>
            </select>
            <button
              type="button"
              onClick={() => {
                handleQuestionChange(
                  number,
                  undefined,
                  undefined,
                  undefined,
                  true
                );
              }}
            >
              x delete
            </button>
          </>
        )}
      </div>
    </>
  );
}
