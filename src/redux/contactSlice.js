import { createSlice } from '@reduxjs/toolkit';
import { addContact, fetchContacts, deleteContact } from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

function isPendingAction(action) {
  return action.type.endsWith('/pending');
}

function isFulfilledAction(action) {
  return action.type.endsWith('/fulfilled');
}

function isRejectedAction(action) {
  return action.type.endsWith('/rejected');
}

const handlePending = state => {
  state.contacts.isLoading = true;
};

const handleFulfilled = state => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return {
        ...state,
        filter: action.payload.filter,
      };
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const index = state.contacts.items.findIndex(
          item => item.id === action.payload.id
        );

        state.contacts.items.splice(index, 1);
      })
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isRejectedAction, handleRejected)
      .addMatcher(isFulfilledAction, handleFulfilled);
  },
});

export const { setFilter } = contactSlice.actions;
