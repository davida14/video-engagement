import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import ReactDOM from "react-dom";

import { useFormik } from "formik";
import axios from "axios";
import "../Dashboard.css";

const validate = (values) => {
  const errors = {};
  if (!values.recipient) {
    errors.recipient = "Required";
  }

  if (!values.title) {
    errors.title = "Required";
  }

  return errors;
};

const AddLists = () => {
  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      recipient: "",
      title: "",
    },
    validate,
    onSubmit: (values) => {
      const res = axios
        .post("http://127.0.0.1:8000/api/items/", values)
        .then((response) => {
          console.log(response);
          alert("successfully added a record");
          history.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <div className="container">
      <h1>Add To Do Lists</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="recipient">Recipient</label>
          </div>
          <div className="col-75">
            <input
              id="recipient"
              name="recipient"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.recipient}
            />
          </div>
        </div>
        {formik.errors.recipient ? <div>{formik.errors.recipient}</div> : null}
        <br />
        <div className="row">
          <div className="col-25">
            <label htmlFor="title">Title</label>
          </div>
          <div className="col-75">
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </div>
        </div>
        {formik.errors.title ? <div>{formik.errors.title}</div> : null}
        <br />
        <div className="row">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddLists;
