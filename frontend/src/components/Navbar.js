import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink class="navbar-brand" to="#">
          <CenterFocusWeakIcon sx={{ fontSize: 50 }} />LPRCS
        </NavLink>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
          <li class="nav-item active">
            <NavLink class="nav-link" to="/">Home</NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" to="/about">About</NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" to="/contact">contact</NavLink>
          </li>
          <li class="nav-item active">
            <NavLink class="nav-link" to="/login">Login</NavLink>
          </li>
          <li class="nav-item active">
            <NavLink class="nav-link" to="/singup">Register</NavLink>
          </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;