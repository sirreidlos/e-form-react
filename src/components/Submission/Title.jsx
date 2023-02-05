import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function Title({ title, description, handleFormProperty }) {
  return (
    <>
      <div className="bg-white rounded-xl">
        <div className=" bg-blue-500 h-6 rounded-t-xl"></div>
        <div className="p-8 space-y-2">
          <input
            type="text"
            className="text-4xl w-full bg-transparent border-b border-gray-300 py-2 outline-none"
            placeholder="Form title"
            value={title}
            onChange={(e) => handleFormProperty(e.target.value)}
            onBlur={() => {
              if (!title) {
                handleFormProperty("Untitled form");
              }
            }}
          />
          <TextareaAutosize
            className="w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
            placeholder="Form description"
            value={description}
            onChange={(e) => handleFormProperty(undefined, e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
