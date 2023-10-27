import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList/ContactList';

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const isContactExist = newName => {
    const newNameNormalize = newName.toLowerCase();
    return Boolean(
      contacts.find(item => item.name.toLowerCase() === newNameNormalize)
    );
  };

  const handleAddContact = ({ name, number }) => {
    if (isContactExist(name)) {
      alert(`${name} is alredy in contacts`);
      return;
    }

    setContacts(prevContacts => {
      const newContact = { id: nanoid(), name, number };
      return [newContact, ...prevContacts];
    });
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacs = () => {
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
            contacts={getFilteredContacs()}
            onDeleteBtnClick={handleDeleteContact}
          />
        </>
      )}
    </div>
  );
};

export default App;
