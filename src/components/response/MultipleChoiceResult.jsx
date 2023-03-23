import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function MultipleChoiceQuestionEdit({
  number,
  text,
  options,
  answer,
  responseId,
}) {
  return (
    <>
      <div className="space-y-2">
        <TextareaAutosize
          type="text"
          className="text-2xl w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
          value={text}
          placeholder="Question"
          readOnly
        />
        <fieldset className="space-y-2">
          {options.map((option, index) => {
            if (option === answer.input) {
              return (
                <div key={index} className="flex gap-2">
                  <input
                    type="radio"
                    value={option}
                    name={`${number}${responseId}`}
                    id={`${number}${index}`}
                    checked
                    readOnly
                    disabled
                  />
                  <label htmlFor={`${number}${index}`}>{option}</label>
                </div>
              );
            }
            return (
              <div key={index} className="flex gap-2">
                <input
                  type="radio"
                  value={option}
                  name={`${number}${responseId}`}
                  id={`${number}${index}`}
                  readOnly
                  disabled
                />
                <label htmlFor={`${number}${index}`}>{option}</label>
              </div>
            );
          })}
        </fieldset>
      </div>
    </>
  );
}
