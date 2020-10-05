import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import AdminAddEvent from './Pages/AdminAddEvent';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterVolunteer from './Pages/RegisterVolunteer';
import MyTasks from './Pages/MyTasks';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Error from './Components/Error/Error';
import AllVolunteersList from './Pages/AllVolunteersList';


export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Switch>
        <Route path="/home">
          <HomePage></HomePage>
        </Route>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <PrivateRoute path="/register/volunteer/:id">
          <RegisterVolunteer></RegisterVolunteer>
        </PrivateRoute>
        <PrivateRoute path="/volunteer/myTasks">
          <MyTasks></MyTasks>
        </PrivateRoute>

        <Route path="/admin/volunteers">
          <AllVolunteersList></AllVolunteersList>
        </Route>

        <Route path="/admin/event">
          <AdminAddEvent></AdminAddEvent>
        </Route>

        <Route exact path="/">
          <HomePage></HomePage>
        </Route>

        <Route path="*">
          <Error></Error>
        </Route>

      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
