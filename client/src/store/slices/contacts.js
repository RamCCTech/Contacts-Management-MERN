import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (userid) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/contacts/fetch",
        {
          user: userid,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to add a new contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/contacts",
        newContact
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to update a contact
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ contactid, updatedContact }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/contacts/update`,
        {
          params: {
            cid: contactid,
            contact: updatedContact,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to delete a contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (data) => {
    try {
      const { contactId, userId } = data;
      await axios.post(`http://localhost:3001/contacts/delete`, {
        params: { id: contactId, user: userId },
      });
      return contactId;
    } catch (error) {
      throw error;
    }
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetContacts: (state) => {
      state.contacts = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(
          (contact) => contact._id === action.payload._id
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact._id !== action.payload
        );
      });
  },
});

export const { resetContacts } = contactSlice.actions;

export default contactSlice.reducer;
