import { Link } from "react-router-dom";

export default function Thumbnail({
  title,
  link,
  image = null,
  thumbnail_string = null,
  date = "",
}) {
  // let blob = undefined;

  // if (thumbnail_string) {
  //   let base64Image = thumbnail_string.split(",")[1];
  //   console.log(base64Image);
  //   const binaryImage = atob(base64Image);
  //   const uint8Array = new Uint8Array(binaryImage.length);
  //   for (let i = 0; i < binaryImage.length; i++) {
  //     uint8Array[i] = binaryImage.charCodeAt(i);

  //     const mimeType = "image/png";
  //     blob = new Blob([uint8Array], { type: mimeType });
  //   }
  // }
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
        <div>
          <p className="text-lg">{title}</p>
          {date ? <p className=" text-gray-500">{date}</p> : ""}
        </div>
      </div>
    </>
  );
}
