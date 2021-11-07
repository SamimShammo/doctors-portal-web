import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, useLocation, Route } from "react-router-dom";
import Home from "./pages/Home/Home/Home";
import AvailableAppointment from "./pages/Appointment/AvailableAppointment/AvailableAppointment";
import Appointment from "./pages/Appointment/Appointment/Appointment";
import Login from "./pages/Login/Login/Login";
import Register from "./pages/Login/Register/Register";
import AuthProvider from "./Context/AuthProvider/AuthProvider";
import PrivateRoute from "./pages/Login/PrivateRoute/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path="/appointment">
              <Appointment></Appointment>
            </PrivateRoute>
            <Route path="/availableAppointment">
              <AvailableAppointment></AvailableAppointment>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/dashboard">
              <Dashboard></Dashboard>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
