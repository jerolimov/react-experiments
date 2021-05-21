import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { List, ListItem } from '@patternfly/react-core';

import GridExperiment from "./pages/GridExperiment";
import LabelIssue from "./pages/LabelIssue";

const links = [
  {
    title: 'GridExperiment',
    path: '/grid',
    component: GridExperiment,
  },
  {
    title: 'LabelIssue',
    path: '/label-issue',
    component: LabelIssue,
  },
];

export default function App() {
  return (
    <Router>
      <Switch>
        {links.map((link) => (
          <Route
            key={link.title}
            path={link.path}
            component={link.component}
          />
        ))}
        
        <Route>
          <List>
            {links.map((link) => (
              <ListItem key={link.title}>
                <Link to={link.path}>{link.title}</Link>
              </ListItem>
            ))}
          </List>
        </Route>
      </Switch>
    </Router>
  );
}
