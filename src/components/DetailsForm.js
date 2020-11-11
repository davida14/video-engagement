import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetailsForm.css";
import Video from "./Video";
import VideoLanding from "./VideoLanding";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Link,
  useParams,
} from "react-router-dom";

const DetailsForm = () => {
  let history = useHistory();
  let { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/items/${id}`);
      setItems(res.data);
    };

    fetchItems();
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/items/${id}`)
      .then((response) => {
        console.log(response);
        alert("successfully Deleted");
        history.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(items);
  return (
    <div className="myForm">
      <div class="message">
        <label for="msg">Video</label>
        {/* <textarea id="msg"></textarea> */}
        {items[0]?.video ? (
          <VideoLanding url={items[0]?.video} />
        ) : (
          <Video id={id} />
        )}
      </div>

      <div>
        <div class="contact">
          <label>Created Time</label>
          <input
            readonly="readonly"
            type="text"
            id="time"
            value={items[0]?.created_at}
          />

          <label>Recipient Name</label>
          <input
            readonly="readonly"
            type="text"
            id="recipient"
            value={items[0]?.recipient}
          />

          <label>Status?</label>
          <input
            readonly="readonly"
            type="text"
            id="watched"
            value={items[0]?.status == 1 ? "completed" : "not completed"}
          />

          <label>Watched?</label>
          <input
            readonly="readonly"
            type="text"
            id="watched"
            value={items[0]?.watched == 1 ? "watched" : "not watched"}
          />

          <Link to={`/watch/${id}`}>
            <label>Video Landing Page</label>
          </Link>
          <input
            type="text"
            id="landing_page"
            //value={items[0]?.video}
            value={`${window.location.origin}/watch/${id}`}
          />

          <button onClick={handleDelete} type="submit">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
