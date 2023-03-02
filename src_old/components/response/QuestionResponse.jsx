import CheckboxesQuestion from "./CheckboxesResponse";
import TextAnswerQuestion from "./TextAnswerResult";
import MultipleChoiceQuestion from "./MultipleChoiceResult";
import DropdownQuestion from "./DropdownResult";
import TimeQuestion from "./TimeResult";
import DateQuestion from "./DateResult";
import { useEffect } from "react";

export default function Question({
  number,
  text,
  kind,
  options,
  answer,
  responseId,
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
      <div className="bg-white rounded-lg p-8 space-y-8 border border-gray-300">
        {kind === questionType.TextAnswer && (
          <TextAnswerQuestion number={number} text={text} />
        )}
        {kind === questionType.MultipleChoice && (
          <MultipleChoiceQuestion
            number={number}
            text={text}
            options={options}
            answer={answer}
            responseId={responseId}
          />
        )}
        {kind === questionType.Checkboxes && (
          <CheckboxesQuestion
            number={number}
            text={text}
            options={options}
            answer={answer}
          />
        )}
        {kind === questionType.Dropdown && (
          <DropdownQuestion
            number={number}
            text={text}
            options={options}
            answer={answer}
          />
        )}
        {kind === questionType.Date && (
          <DateQuestion number={number} text={text} answer={answer} />
        )}
        {kind === questionType.Time && (
          <TimeQuestion number={number} text={text} answer={answer} />
        )}
      </div>
    </>
  );
}
