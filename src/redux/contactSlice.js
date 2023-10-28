import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContact: {
      reducer: (state, action) => {
        return {
          ...state,
          contacts: [action.payload, ...state.contacts],
        };
      },
      prepare: (name, number) => {
        const id = nanoid();
        return {
          payload: {
            id,
            name,
            number,
          },
        };
      },
    },
    setFilter: (state, action) => {
      return {
        ...state,
        filter: action.payload.filter,
      };
    },
    deleteContact: (state, action) => {
      const id = action.payload.id;

      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== id),
      };
    },
  },
});

export const { setContact, setFilter, deleteContact } = contactSlice.actions;
