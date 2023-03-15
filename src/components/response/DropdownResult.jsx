import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function DropdownQuestionEdit({
  number,
  text,
  options,
  answer,
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
        {
          <select className="p-2 rounded-md" readOnly disabled>
            {options.map((option, index) => {
              if (option === answer.input) {
                return (
                  <option key={index} value={option} defaultValue>
                    {option}
                  </option>
                );
              }
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        }
      </div>
    </>
  );
}
