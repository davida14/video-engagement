import React from "react";
import Webcam from "react-webcam";
//import React, { useState, useEffect,useRef,useCallback } from "react";
import axios from "axios";

const WebcamStreamCapture = () => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [stopRecording,setStopRecording] = React.useState(true);
  
    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
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
            type: "video/webm"
          });
  
              let data = new FormData();
              data.append("video",blob);
  
            const res = await axios.post("http://127.0.0.1:8000/api/video-upload/",data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }); //pass id
            console.log(res);
  
          setRecordedChunks([]);
        }
      }, [recordedChunks]);
  

      React.useEffect(() => {
        setTimeout(() => {
            setStopRecording(false);
        },3000);
      },[capturing]);

    return (
      <>
      {/* player */}
      {/* <video src="http://127.0.0.1:8000/video_uploaded/phpZDNbeU.mkv" controls></video> */}

      {/* recording */}
        <Webcam audio={false} ref={webcamRef} />
        {capturing ? (
           stopRecording ? "Recording (must be minimum 3 secs)...." :  <button  onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
          <button onClick={handleDownload}>Download</button>
        )}
      </>
    );
  };


  export default WebcamStreamCapture;
