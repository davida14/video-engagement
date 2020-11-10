import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import "../Dashboard.css";

const Items = ({ items, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  console.log(items);

  return (
    <List>
      {items.map((item) => (
        <div key={item.id}>
          <Link to={`/details/${item.id}`}>
            <ListItem>
              <ListItemIcon>
                {item.status == 1 ? <CheckIcon /> : <ClearIcon />}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </Link>
        </div>
      ))}
    </List>
  );
};

export default Items;
