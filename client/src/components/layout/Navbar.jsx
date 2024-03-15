import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../store/slices/userSlice";
import { resetContacts } from "../../store/slices/contactsSlice";

const Navbar = ({ title, icon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleLogout = () => {
    dispatch(signOut());
    dispatch(resetContacts());
    navigate("/");
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Contact Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Contact Us
              </Link>
            </li> */}
          </ul>
          {/* {currentUser && (
            <form className="d-flex" role="search">
              <input
                className="form-control me-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          )} */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/signin">
                  Login
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/signup">
                  Sign Up
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/add-contact"
                >
                  Add Contact
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <button
                  className="nav-link"
                  aria-current="page"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "My Contact Book",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
