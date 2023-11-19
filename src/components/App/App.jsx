import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList/ContactList';
import { setFilter } from 'redux/contactSlice';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectIsLoading,
} from 'redux/selectors';
import { fetchContacts, addContact, deleteContact } from 'redux/operations';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  const isContactExist = newName => {
    const newNameNormalize = newName.toLowerCase();
    return Boolean(
      contacts.find(item => item.name.toLowerCase() === newNameNormalize)
    );
  };

  const handleAddContact = ({ name, phone }) => {
    if (isContactExist(name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, phone }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
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
      {isLoading ? <p>Loading...</p> : <p>&nbsp;</p>}
      {error && <p>An error occured, please reload the page</p>}

      {!error && (
        <>
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
        </>
      )}
    </div>
  );
};

export default App;
