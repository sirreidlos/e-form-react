import { useState } from "react";
import { Link } from "react-router-dom";
// import html2canvas from "html2canvas";
import Thumbnail from "../components/Thumbnail";

export default function Main() {
  let [showLogout, setShowLogout] = useState(false);
  //   html2canvas(document.body).then(function (canvas) {
  //     let myImage = canvas.toDataURL("image/png");
  //     // window.open(myImage);
  //   });
  return (
    <>
      <header className="fixed bg-white py-2 px-4 flex w-screen justify-between">
        <Link to="/">
          <img src="/E-Form.png" alt="e form" />
        </Link>
        <div className="flex gap-24 justify-between items-center">
          <div className="bg-gray-200 w-[48rem] px-4 py-2 rounded-md">
            <input
              className="bg-gray-200 w-full outline-none"
              type="text"
              placeholder="Telusuri di Drive atau tempel URL"
            />
          </div>
          <div className="text-2xl hover:text-gray-600">
            <a href="/templates">Gallery Template</a>
          </div>
        </div>

        {showLogout ? <div>todo!("LOGOUT")</div> : ""}
        <div
          className="cursor-pointer pointer-events-none"
          onClick={() => setShowLogout((showLogout) => !showLogout)}
          tabIndex="0"
          role="button"
        >
          <img src="/user.png" alt="user" />
        </div>
      </header>

      <div className="bg-gray-200 px-48 pt-20 pb-6 space-y-4">
        <div className="text-2xl">Start a new form</div>
        <div className="flex justify-between">
          <Thumbnail title={"Blank"} link={"/new"} image={"new-form.png"} />
          <Thumbnail
            title={"Introduction Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Green Hill Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Customer Center Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
        </div>
      </div>
      <div className="bg-white px-48 py-6 space-y-4">
        <div className="text-2xl">Recent forms</div>
        <div className="grid grid-cols-[repeat(5,_minmax(0,_16rem))] justify-between gap-y-6">
          <Thumbnail
            title={"Blank"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Blank"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Introduction Survey"}
            link={"/new"}
            image={"form1.png"}
            date="17 January 2021"
          />
          <Thumbnail
            title={"Green Hill Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Customer Center Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Customer Center Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Customer Center Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
          <Thumbnail
            title={"Complaint Survey"}
            link={"/new"}
            image={"placeholder-16-9.png"}
          />
        </div>
      </div>
    </>
  );
}
