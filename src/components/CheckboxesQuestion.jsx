import { useState } from "react";

export default function CheckboxesQuestion({ number, text, options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <div>
      <p>{text}</p>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            value={option}
            onChange={handleCheckboxChange}
          />
          {option}
        </div>
      ))}
    </div>
  );
}
