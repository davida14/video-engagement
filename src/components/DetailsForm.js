import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import axios from "axios";
import "./DetailsForm.css";

const DetailsForm = () => {
  let { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/items/${id}`);
      setItems(res.data);
    };

    fetchItems();
  }, [id]);

  console.log(items);
  return (
    <div className="myForm">
  <div class="message">
    <label for="msg">Video</label>
    <textarea id="msg"></textarea>
  </div>


  <div>

  <div class="contact">
  <label >Created Time</label>
    <input readonly="readonly" type="text" id="time" value={items[0]?.created_at}/>
    
    <label>Recipient Name</label>
    <input readonly="readonly" type="text" id="recipient" value={items[0]?.recipient}/>

        <label >Watched?</label>
    <input readonly="readonly" type="text" id="watched" value={items[0]?.watched}/>
    
    <label>Video Landing Page</label>
    <input readonly="readonly" type="text" id="landing_page" value={items[0]?.video}/>

    <button type="submit">Delete</button>    
  </div>
  </div>
    </div>
  );
};

export default DetailsForm;
