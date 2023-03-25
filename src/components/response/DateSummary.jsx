import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function DateQuestionEdit({ number, text, data }) {
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

        <div className=" flex flex-col gap-2 max-h-60 overflow-scroll">
          {Object.entries(data).map(([key, value]) => {
            return (
              <div
                className="flex justify-between bg-gray-200 p-2 rounded-lg"
                key={key}
              >
                <div>{key}</div>
                <div className="font-semibold text-gray-400">
                  {value > 1 ? value : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
