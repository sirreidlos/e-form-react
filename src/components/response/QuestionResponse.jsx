import CheckboxesResponse from "./CheckboxesResponse";
import TextAnswerResponse from "./TextAnswerResult";
import MultipleChoiceResponse from "./MultipleChoiceResult";
import DropdownResponse from "./DropdownResult";
import TimeResponse from "./TimeResult";
import DateResponse from "./DateResult";
import { Chart, ArcElement, Tooltip, Legend, Colors } from "chart.js";
import CheckboxesSummary from "./CheckboxesSummary";
// import DateSummary from "./DateSummary";
// import DropdownSummary from "./DropdownSummary";
// import MultipleChoiceSummary from "./MultipleChoiceSummary";
// import TextAnswerSummary from "./TextAnswerSummary";
// import TimeSummary from "./TimeSummary";

Chart.register(ArcElement, Tooltip, Legend, Colors);

export default function Response({
  number,
  text,
  kind,
  options,
  answer,
  responseId,
  isSummaryMode = false,
  summarizedData,
}) {
  const questionType = {
    TextAnswer: "TextAnswer",
    MultipleChoice: "MultipleChoice",
    Checkboxes: "Checkboxes",
    Dropdown: "Dropdown",
    Date: "Date",
    Time: "Time",
  };

  console.log(summarizedData);

  return (
    <>
      <div className="bg-white rounded-lg p-8 space-y-8 border border-gray-300">
        {kind === questionType.TextAnswer && !isSummaryMode && (
          <TextAnswerResponse
            number={number}
            text={text}
            answer={answer.input}
          />
        )}
        {kind === questionType.MultipleChoice && !isSummaryMode && (
          <MultipleChoiceResponse
            number={number}
            text={text}
            options={options}
            answer={answer}
            responseId={responseId}
          />
        )}
        {kind === questionType.Checkboxes && !isSummaryMode && (
          <CheckboxesResponse
            number={number}
            text={text}
            options={options}
            answer={answer}
          />
        )}
        {kind === questionType.Dropdown && !isSummaryMode && (
          <DropdownResponse
            number={number}
            text={text}
            options={options}
            answer={answer}
          />
        )}
        {kind === questionType.Date && !isSummaryMode && (
          <DateResponse number={number} text={text} answer={answer} />
        )}
        {kind === questionType.Time && !isSummaryMode && (
          <TimeResponse number={number} text={text} answer={answer} />
        )}

        {/* {kind === questionType.TextAnswer && isSummaryMode && (
          <TextAnswerSummary number={number} text={text} />
        )}
        {kind === questionType.MultipleChoice && isSummaryMode && (
          <MultipleChoiceSummary
            number={number}
            text={text}
            options={options}
            answer={answer}
            responseId={responseId}
          />
        )} */}
        {kind === questionType.Checkboxes && isSummaryMode && (
          <CheckboxesSummary
            number={number}
            text={text}
            data={summarizedData}
          />
        )}
        {/* {kind === questionType.Dropdown && isSummaryMode && (
          <DropdownSummary
            number={number}
            text={text}
            options={options}
            answer={answer}
          />
        )}
        {kind === questionType.Date && isSummaryMode && (
          <DateSummary number={number} text={text} answer={answer} />
        )}
        {kind === questionType.Time && isSummaryMode && (
          <TimeSummary number={number} text={text} answer={answer} />
        )} */}
      </div>
    </>
  );
}
