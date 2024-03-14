import React from "react";
import ContactList from "../components/contact/ContactList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="container mt-4">
      {currentUser ? (
        <>
          <h1 className="text-center">Contact List</h1>
          <ContactList />
        </>
      ) : (
        <div className="text-center">
          <img
            src="https://cdn-icons-png.freepik.com/512/7229/7229022.png"
            alt="Empty Page"
            className="img-fluid mb-4"
          />
          <p>
            Please{" "}
            <Link to="/signin" className="btn btn-outline-primary me-2">
              Sign In
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="btn btn-outline-secondary">
              Sign Up
            </Link>{" "}
            to view your contacts.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
