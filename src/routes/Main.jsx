import { Link } from "react-router-dom";
// import html2canvas from "html2canvas";
import Thumbnail from "../components/Thumbnail";

export default function Main() {
  //   html2canvas(document.body).then(function (canvas) {
  //     let myImage = canvas.toDataURL("image/png");
  //     // window.open(myImage);
  //   });
  return (
    <>
      <header className="bg-white p-6 flex w-screen justify-between">
        <Link to="/">
          <img src="/E-Form.png" alt="e form" />
        </Link>
        <div>
          <div>search</div>
          <div>galery template</div>
        </div>

        <Link to="/user">
          <img src="/user.png" alt="user" />
        </Link>
      </header>

      <div className="bg-gray-200 px-48 py-6 space-y-4">
        <div className="text-2xl">Start a new form</div>
        <div className="flex justify-between [&>div]:space-y-2 [&>*>p]:text-lg [&>*>*>img]:border [&>*>*>img]:border-gray-300">
          <Thumbnail title={"Blank"} link={"/new"} image={"new-form.png"} />
          <Thumbnail
            title={"Introduction Survey"}
            link={"/new"}
            image={"new-form.png"}
          />
          <Thumbnail
            title={"Green Hill Survey"}
            link={"/new"}
            image={"new-form.png"}
          />
          <Thumbnail
            title={"Customer Center Survey"}
            link={"/new"}
            image={"new-form.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"new-form.png"}
          />
        </div>
      </div>
      <div className="bg-white px-48 py-6 space-y-4">
        <div className="text-2xl">Recent forms</div>
        <div className="grid grid-cols-[repeat(5,_minmax(0,_16rem))] justify-between [&>div]:space-y-2 [&>*>p]:text-lg [&>*>*>img]:border [&>*>*>img]:border-gray-300">
          <Thumbnail title={"Blank"} link={"/new"} image={"new-form.png"} />
          <Thumbnail title={"Blank"} link={"/new"} image={"new-form.png"} />
          <Thumbnail
            title={"Introduction Survey"}
            link={"/new"}
            image={"form1.png"}
          />
          <Thumbnail
            title={"Green Hill Survey"}
            link={"/new"}
            image={"new-form.png"}
          />
          <Thumbnail
            title={"Customer Center Survey"}
            link={"/new"}
            image={"new-form.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"new-form.png"}
          />
        </div>
      </div>
    </>
  );
}
