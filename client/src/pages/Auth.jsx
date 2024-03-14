import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../store/slices/userSlice";
import { fetchContacts } from "../store/slices/contacts";

const Auth = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const initialFormData = () => {
    if (type === "signup") {
      return {
        name: "",
        username: "",
        email: "",
        password: "",
      };
    } else {
      return {
        email: "",
        password: "",
      };
    }
  };

  const [formData, setFormData] = useState(initialFormData());

  useEffect(() => {
    setFormData(initialFormData());
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "signin") {
      dispatch(signInStart());
      try {
        const response = await fetch("http://localhost:3001/auth/signin", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.success) {
          console.log("User signed in successfully:", data.user);

          dispatch(signInSuccess(data.user));
          dispatch(fetchContacts(data.user._id));
          navigate("/");
        } else {
          dispatch(signInFailure(data.message));
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error signing in:", error);
        dispatch(signInFailure("An error occurred"));
      }
    } else if (type === "signup") {
      try {
        const response = await fetch("http://localhost:3001/auth/signup", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.success) {
          console.log("User signed up successfully:", data);

          navigate("/signin");
        } else {
          alert(`Error: ${data.message}`);
        }
        console.log(formData);
      } catch (error) {
        console.error("Error signing up:", error);
      } finally {
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onSubmit={handleSubmit}
            >
              <h1 className="text-center">
                {type === "signin"
                  ? "Login"
                  : type === "signup"
                  ? "Sign Up"
                  : "Forgot Password"}
              </h1>
              {type == "signup" && (
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                  />
                </div>
              )}
              {type == "signup" && (
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1">
                    User Name
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                />
              </div>

              {type === "signin" && (
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h6>Don't have an account? </h6>
                  <Link to="/signup" className="text-decoration-none">
                    Sign Up
                  </Link>
                </div>
              )}
              {type === "signin" && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6>Forgot your password?</h6>
                  <Link to="/forgotpassword" className="text-decoration-none">
                    Reset Password
                  </Link>
                </div>
              )}
              {type === "signup" && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6>Already have an account?</h6>
                  <Link to="/signin" className="text-decoration-none">
                    Sign In
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block text-center"
                style={{ width: "fit-content", margin: "0 auto" }}
              >
                {type === "signin"
                  ? "Login"
                  : type === "signup"
                  ? "Sign Up"
                  : "Reset"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
