import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function TimeQuestionEdit({
  number,
  text,
  handleQuestionChange,
  handleAnswerChange,
  isSubmitMode,
}) {
  // const [question, setQuestion] = useState("Question");

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
          placeholder="Time"
          disabled={!isSubmitMode}
          onChange={(e) => {
            handleAnswerChange(number, e.target.value, undefined);
          }}
        />
      </div>
    </>
  );
}
