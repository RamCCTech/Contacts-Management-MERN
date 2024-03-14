import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addContact, updateContact } from "../store/slices/contacts";

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const contacts = useSelector((state) => state.contact.contacts);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  // Fetch contact data if ID exists in URL
  useEffect(() => {
    if (id) {
      const contact = contacts.filter((c) => c._id === id)[0];
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        image: contact.image,
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/");
      return;
    }
    if (id) {
      dispatch(updateContact({ contactid: id, updatedContact: formData }));
    } else {
      dispatch(addContact({ ...formData, user: currentUser._id }));
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      image: "",
    });
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{id ? "Update Contact" : "Add New Contact"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profileUrl" className="form-label">
            Profile URL
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
};

export default AddContact;
