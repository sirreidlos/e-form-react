import { useState } from "react";

import CheckboxesQuestion from "./CheckboxesQuestion";
import TextAnswerQuestionEdit from "./TextAnswerQuestionEdit";
import MultipleChoiceQuestionEdit from "./MultipleChoiceQuestionEdit";

export default function Question({
  number,
  text,
  kind,
  options,
  handleChange,
}) {
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
      <div className="bg-white rounded-lg p-8 space-y-8">
        {kind === questionType.TextAnswer && (
          <TextAnswerQuestionEdit
            number={number}
            text={text}
            handleChange={handleChange}
          />
        )}
        {kind === questionType.MultipleChoice && (
          <MultipleChoiceQuestionEdit
            number={number}
            text={text}
            options={options}
            handleChange={handleChange}
          />
        )}
        {kind === questionType.Checkboxes && <p>Checkboxes</p>}
        {kind === questionType.Dropdown && <p>Dropdown</p>}
        {kind === questionType.Date && <p>Date</p>}
        {kind === questionType.Time && <p>Time</p>}
        <select
          value={kind}
          className="p-2 rounded-md"
          onChange={(e) => {
            handleChange(number, undefined, e.target.value);
          }}
        >
          <option value={questionType.TextAnswer}>Text Answer</option>
          <option value={questionType.MultipleChoice}>Multiple Choice</option>
          <option value={questionType.Checkboxes}>Checkboxes</option>
          <option value={questionType.Dropdown}>Dropdown</option>
          <option value={questionType.Date}>Date</option>
          <option value={questionType.Time}>Time</option>
        </select>
        <button
          onClick={() => {
            handleChange(number, undefined, undefined, undefined, true);
          }}
        >
          x delete
        </button>
      </div>
    </>
  );
}
