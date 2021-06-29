import './App.css';
import { Switch, Route } from "react-router-dom";

import Home from './components/Home/Home';
import ProjectForm from './components/ProjectForm/ProjectForm';
import Project from './components/Project/Project';

const App = () => {

  return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/project" component={Project} />
        <Route path="/project-form" component={ProjectForm} />
      </Switch>
  );
}

export default App;
