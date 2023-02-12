import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function DropdownQuestionEdit({
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
        {isSubmitMode && (
          <select
            className="p-2 rounded-md"
            onChange={(e) => {
              handleAnswerChange(number, e.target.value);
            }}
          >
            {options.map((option, index) => {
              return <option value={option}>{option}</option>;
            })}
          </select>
        )}
        {!isSubmitMode &&
          options.map((option, index) => {
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
                    handleQuestionChange(
                      number,
                      undefined,
                      undefined,
                      newOptions
                    );
                  }}
                />
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
