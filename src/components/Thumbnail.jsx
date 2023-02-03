import { Link } from "react-router-dom";

export default function Thumbnail({ title, link, image, date = "" }) {
  return (
    <>
      <div className="flex flex-col space-y-1">
        <Link to={link}>
          <img
            src={image}
            className="rounded-xl aspect-video h-36 border border-gray-300"
            alt={image}
          />
        </Link>
        <div>
          <p className="text-lg">{title}</p>
          {date ? <p className=" text-gray-500">{date}</p> : ""}
        </div>
      </div>
    </>
  );
}
