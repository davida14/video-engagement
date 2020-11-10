import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import DetailsForm from './components/DetailsForm';
import AddLists from './components/AddLists';
import Video from './components/Video';

function App() {
  return (
    <main>
    <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/details/:id" component={DetailsForm} />
        <Route path="/add" component={AddLists} />
        <Route path="/video" component={Video} />
        <Route component={Error} />
    </Switch>
</main>
  );
}

export default App;
