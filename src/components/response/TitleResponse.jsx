import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function Title({ title, description }) {
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-300">
        <div className=" bg-blue-500 h-6 rounded-t-xl"></div>
        <div className="p-8 space-y-2">
          <input
            type="text"
            className="text-4xl w-full bg-transparent border-b border-gray-300 py-2 outline-none"
            placeholder="Form title"
            value={title}
            readOnly
          />
          <TextareaAutosize
            className="w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
            placeholder="Form description"
            value={description}
            readOnly
          />
        </div>
      </div>
    </>
  );
}
