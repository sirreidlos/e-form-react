import { useState } from "react";

import CheckboxesQuestionEdit from "./CheckboxesQuestionEdit";
import TextAnswerQuestionEdit from "./TextAnswerQuestionEdit";
import MultipleChoiceQuestionEdit from "./MultipleChoiceQuestionEdit";
import DropdownQuestionEdit from "./DropdownQuestionEdit";
import TimeQuestionEdit from "./TimeQuestionEdit";
import DateQuestionEdit from "./DateQuestionEdit";

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

  if (!options) {
    handleChange(number, undefined, undefined, ["Option 1"]);
  }

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
        {kind === questionType.Checkboxes && (
          <CheckboxesQuestionEdit
            number={number}
            text={text}
            options={options}
            handleChange={handleChange}
          />
        )}
        {kind === questionType.Dropdown && (
          <DropdownQuestionEdit
            number={number}
            text={text}
            options={options}
            handleChange={handleChange}
          />
        )}
        {kind === questionType.Date && (
          <DateQuestionEdit
            number={number}
            text={text}
            handleChange={handleChange}
          />
        )}
        {kind === questionType.Time && (
          <TimeQuestionEdit
            number={number}
            text={text}
            handleChange={handleChange}
          />
        )}
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
          type="button"
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
