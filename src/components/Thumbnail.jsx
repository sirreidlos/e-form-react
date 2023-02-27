import { Link } from "react-router-dom";
import ApiClient from "../tools/ApiClient";

export default function Thumbnail({
  id,
  title,
  link,
  image = null,
  thumbnail_string = null,
  showMessage,
  updateHandler,
}) {
  function deleteForm() {
    ApiClient.delete(`/form/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          showMessage("FAILURE", res.data.message);
          return;
        }

        updateHandler(id);
        showMessage("SUCCESS", res.data.message);
      })
      .catch((err) => showMessage("FAILURE", err));
  }
  return (
    <>
      <div className="flex flex-col space-y-1">
        <Link to={link}>
          <img
            src={
              image
                ? image
                : thumbnail_string
                ? thumbnail_string
                : "placeholder-16-9.png"
            }
            className="rounded-xl w-64 h-36 border border-gray-300"
            alt={image}
          />
        </Link>
        <div className="flex justify-between">
          <p className="text-lg">{title}</p>
          <button onClick={deleteForm}>&times;</button>
        </div>
      </div>
    </>
  );
}
