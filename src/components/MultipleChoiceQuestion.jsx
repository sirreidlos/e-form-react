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
        <fieldset className="space-y-2">
          {options.map((option, index) => {
            return (
              <div key={index} className="flex gap-2">
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
                    className="hover:bg-gray-200 rounded-full h-6 w-6"
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
                    🞫
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
            <button type="button" className="text-gray-400">
              + Add option
            </button>
          </div>
        )}
      </div>
    </>
  );
}
