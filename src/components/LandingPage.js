import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LandingPage.css";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Link,
  useParams,
} from "react-router-dom";

const LandingPage = () => {
  let history = useHistory();
  let { id } = useParams();
  const [items, setItems] = useState([]);

  console.log(id);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/items/${id}`);
      setItems(res.data);
    };

    fetchItems();
  }, [id]);

  useEffect(() => {
    if (!items[0]?.video) {
      const updateWatchStatus = async () => {
        const res = await axios.put(
          `http://127.0.0.1:8000/api/items/${id}?watched=1`
        );
      };
      console.log("update video");
      updateWatchStatus();
    }
  }, []);

  return (
    <div className="videoDiv">
      {/* <video src={`http://127.0.0.1:8000/${url}`} controls></video>  */}
      <video src={`http://127.0.0.1:8000/${items[0]?.video}`} controls></video>
    </div>
  );
};

export default LandingPage;
