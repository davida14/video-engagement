import React from "react";
import "../Dashboard.css";

const VideoLanding = ({ url }) => {
  console.log(url);

  return (
    <div>
      <video src={`http://127.0.0.1:8000/${url}`} controls></video>
    </div>
  );
};

export default VideoLanding;
