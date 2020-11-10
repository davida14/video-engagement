import React, { useState, useEffect } from "react";
import Items from "./components/Items";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./Dashboard.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useParams
  } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/api/items/");
      setItems(res.data);
      setLoading(false);
    };

    fetchItems();
  }, []);

  // Get current Items
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Bonjoro To Do Lists</h1>

      <div className="add">
      <Link to="/add">
      <button>Add Todo</button>
      </Link>
      </div>

      <Items items={currentItems} loading={loading} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Dashboard;
