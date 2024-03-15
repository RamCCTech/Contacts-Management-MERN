import React from "react";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri"; // Import icons from React Icons
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../store/slices/contactsSlice";
import { useNavigate } from "react-router-dom";

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleDelete = () => {
    dispatch(
      deleteContact({ contactId: contact._id, userId: currentUser._id })
    );
  };
  const handleEdit = () => {
    navigate(`/update-contact/${contact._id}`);
  };

  return (
    <div className="card m-3 h-100" style={{ height: "150px" }}>
      <div className="row g-2">
        <div className="col-md-4">
          <img
            src={contact.image}
            className="img-fluid rounded-start"
            alt="..."
            style={{ height: "150px" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text m-0">{contact.phone}</p>
            <p className="card-text text-truncate">{contact.email}</p>
            <div className="d-flex justify-content-end">
              {/* <button
                className="btn btn-outline-danger me-2"
                onClick={handleDelete}
              > */}
              <RiDeleteBinLine
                className="me-2"
                onClick={handleDelete}
                style={{ fontSize: "24px", color: "red", cursor: "pointer" }}
              />
              {/* </button> */}
              {/* <button className="btn btn-outline-primary" onClick={handleEdit}> */}
              <RiPencilLine
                onClick={handleEdit}
                style={{
                  fontSize: "24px",
                  color: "#03dbfc",
                  cursor: "pointer",
                }}
              />
              {/* </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
