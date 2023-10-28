import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList/ContactList';
import { deleteContact, setContact, setFilter } from 'redux/contactSlice';
import { getContacts, getFilter } from 'redux/selectors';

const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const isContactExist = newName => {
    const newNameNormalize = newName.toLowerCase();
    return Boolean(
      contacts.find(item => item.name.toLowerCase() === newNameNormalize)
    );
  };

  const handleAddContact = ({ name, number }) => {
    if (isContactExist(name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(setContact(name, number));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact({ id }));
  };

  const handleFilterChange = e => {
    dispatch(setFilter({ filter: e.target.value }));
  };

  const getFilteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <p>Your phone book is empty, add your first contact</p>
      ) : (
        <>
          <Filter value={filter} onChange={handleFilterChange} />
          <ContactList
            contacts={getFilteredContacts()}
            onDeleteBtnClick={handleDeleteContact}
          />
        </>
      )}
    </div>
  );
};

export default App;
