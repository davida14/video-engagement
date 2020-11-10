import React from "react";
import Webcam from "react-webcam";
import axios from "axios";

const Video = ({ id }) => {
  console.log(id);

  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [recroding, setRecording] = React.useState(false);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    setRecording(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      let data = new FormData();
      data.append("video", blob);
      data.append("id", id);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/video-upload/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ); //pass id
      console.log(res);

      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  React.useEffect(() => {
    console.log("test useffect");
    setTimeout(() => {
      console.log("test 22");
      setRecording(false);
    }, 3000);
  }, [recroding]);

  return (
    <>
      {/* player */}
      {/* <video src="http://127.0.0.1:8000/video_uploaded/phpZDNbeU.mkv" controls></video> */}

      {/* recording */}
      <Webcam audio={false} ref={webcamRef} />
      {capturing ? (
        recroding ? (
          "Recording (must be minimum 3 secs)...."
        ) : (
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        )
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Save</button>
      )}
    </>
  );
};

export default Video;
