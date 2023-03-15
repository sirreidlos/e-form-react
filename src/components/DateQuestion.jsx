import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function DateQuestionEdit({
  number,
  text,
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
        <TextareaAutosize
          className="w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
          placeholder="Date"
          disabled={!isSubmitMode}
          onChange={(e) => {
            handleAnswerChange(number, e.target.value, undefined);
          }}
        />
      </div>
    </>
  );
}
