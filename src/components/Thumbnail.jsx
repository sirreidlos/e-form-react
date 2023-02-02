import { Link } from "react-router-dom";

export default function Thumbnail({ title, link, image }) {
  return (
    <>
      <div className="flex flex-col">
        <Link to={link}>
          <img
            src={image}
            className="rounded-xl aspect-video h-36"
            alt={image}
          />
        </Link>
        <p>{title}</p>
      </div>
    </>
  );
}
