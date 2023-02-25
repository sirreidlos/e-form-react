import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function TextAnswerQuestionEdit({ number, text, answer }) {
  // const [question, setQuestion] = useState("Question");

  return (
    <>
      <div className="space-y-2">
        <TextareaAutosize
          type="text"
          className="text-2xl w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
          readOnly
          value={text}
          placeholder="Question"
        />
        <TextareaAutosize
          className="w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
          placeholder="Text answer"
          readOnly
          value={answer.input}
        />
      </div>
    </>
  );
}
