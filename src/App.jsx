import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import './App.css';
import Questionnaire from './Components/layouts/Questionnaire';
import Admin from './Components/layouts/Admin';
import Results from './Components/layouts/Results';
import { getLocalStorageUser } from './jobs/storage/localStore';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Questionnaire} />
              <Route exact path="/poll" component={Questionnaire} />
              <Route
                exact
                path="/admin"
                render={() =>
                  getLocalStorageUser() ? <Admin /> : <Redirect to="/" />
                }
              />
              <Route exact path="/results" component={Results} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
