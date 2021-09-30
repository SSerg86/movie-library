import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useContext } from 'react';
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar';

// Pages
import Homepage from './pages/Homepage/Homepage';
import Searchpage from './pages/Searchpage/Searchpage';
import Singlefilmpage from './pages/Singlefilm/Singlefilmpage';
import Mylibrary from './pages/Mylibrary/Mylibrary';
import Authpage from './pages/Authpage/Authpage';
import AuthContext from './context/auth/authContext';

const App = () => {
  const authContext = useContext(AuthContext);
  return (
    <Router className="app">
      <Navbar />
      <div className="container">
        <Switch>
          {!authContext.isLoggedIn && (
            <Route exact path="/auth" component={Authpage} />
          )}
          {authContext.isLoggedIn && (
            <Route exact path="/" component={Homepage} />
          )}
          {authContext.isLoggedIn && (
            <Route exact path="/search" component={Searchpage} />
          )}
          <Route exact path="/login" component={Authpage} />
          {authContext.isLoggedIn && (
            <Route exact path="/library" component={Mylibrary} />
          )}
          {authContext.isLoggedIn && (
            <Route path="/show/:id" component={Singlefilmpage} />
          )}
          <Route path="*">
            <Redirect to="/auth" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
