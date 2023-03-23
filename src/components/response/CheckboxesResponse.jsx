import { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useEffect } from "react";

export default function CheckboxesResponse({ number, text, options, answer }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions(answer.selected_options);
  }, [answer]);
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
        {options.map((option, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.indexOf(option) > -1}
                disabled
                readOnly
              />
              {option}
            </div>
          );
        })}
      </div>
    </>
  );
}
