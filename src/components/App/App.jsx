import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList/ContactList';

// const INITIAL_STATE = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

const LOCAL_STORAGE_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      this.setState({ contacts });
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(this.state.contacts)
    );
  }

  handleAddContact = ({ name, number }) => {
    if (this.isContactExist(name)) {
      alert(`${name} is alredy in contacts`);
      return;
    }

    this.setState(prevState => {
      const newContact = { id: nanoid(), name, number };
      return { contacts: [newContact, ...prevState.contacts] };
    });
  };

  isContactExist = newName => {
    const newNameNormalize = newName.toLowerCase();
    return Boolean(
      this.state.contacts.find(
        item => item.name.toLowerCase() === newNameNormalize
      )
    );
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getFilteredContacs = () => {
    const { contacts, filter } = this.state;

    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(item =>
      item.name.toLowerCase().includes(normalizeFilter)
    );
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(value => value.id !== id),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const filtredContacts = this.getFilteredContacs();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />
        <h2>Contacts</h2>

        {contacts.length === 0 ? (
          <p>Your phone book is empty, add your first contact</p>
        ) : (
          <>
            <Filter value={filter} onChange={this.handleInputChange} />
            <ContactList
              contacts={filtredContacts}
              onDeleteBtnClick={this.handleDeleteContact}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
