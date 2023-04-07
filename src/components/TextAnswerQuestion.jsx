import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function TextAnswerQuestionEdit({
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
          disabled={isSubmitMode}
          onChange={(e) => {
            handleQuestionChange(number, e.target.value);
          }}
          value={text}
          placeholder="Question"
        />
        <TextareaAutosize
          className="w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
          placeholder="Text answer"
          disabled={!isSubmitMode}
          onChange={(e) => {
            handleAnswerChange(number, e.target.value, undefined);
          }}
        />
      </div>
    </>
  );
}
