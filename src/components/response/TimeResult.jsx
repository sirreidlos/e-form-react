import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function TimeQuestionEdit({ number, text, answer }) {
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
        <TextareaAutosize
          className="w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
          placeholder="Time"
          readOnly
          value={answer.input}
        />
      </div>
    </>
  );
}
