import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../PageComponents/AboutPage/AboutPage';
import UserPage from '../PageComponents/UserPage/UserPage';
import InfoPage from '../PageComponents/InfoPage/InfoPage';
import LandingPage from '../PageComponents/LandingPage/LandingPage';
import LoginPage from '../PageComponents/LoginAndRegisterPages/LoginPage/LoginPage';
import RegisterPage from '../PageComponents/LoginAndRegisterPages/RegisterPage/RegisterPage';
import EditOrAddRecipePage from '../PageComponents/EditOrAddRecipePage/EditOrAddRecipePage';
import ShoppingListPage from '../PageComponents/ShoppingListPage/ShoppingListPage';
import ViewRecipePage from '../PageComponents/ViewRecipePage/ViewRecipePage';
import HomePage from '../PageComponents/HomePage/HomePage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /home page
              <Redirect to="/home" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /home page
              <Redirect to="/home" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // show them the HomePage page
              <HomePage />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          <Route
            exact
            path="/view-recipe/:recipeCategory/:recipeName/:id"
          >
            {user.id ?
              // If the user is already logged in, 
              // show them the ViewRecipePage
              <ViewRecipePage />
              :
              // Otherwise, show the LandingPage
              <LandingPage />
            }
          </Route>

          <Route
            exact
            path="/add-or-edit-recipe/:id?"
          >
            {user.id ?
              // If the user is already logged in, 
              // show them the EditOrAddRecipePage page
              <EditOrAddRecipePage />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <div className='center'>
              <h1>404</h1>
              <h2>Page not found</h2>
            </div>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
