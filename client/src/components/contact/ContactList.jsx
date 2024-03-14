import React from "react";
import ContactItem from "./ContactItem";
import { useSelector } from "react-redux";

const ContactList = () => {
  const contacts = useSelector((state) => state.contact.contacts);

  if (contacts.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h2>No contacts found</h2>
        <p>Add some contacts to see them here.</p>
      </div>
    );
  }

  return (
    <div className="container d-flex row row-cols-1 row-cols-md-2 row-cols-lg-3">
      {contacts.map((contact) => (
        <div key={contact.id} className="col h-100">
          <ContactItem contact={contact} />
        </div>
      ))}
    </div>
  );
};

export default ContactList;
