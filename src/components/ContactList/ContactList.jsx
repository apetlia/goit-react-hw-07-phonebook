import React from 'react';
import { Button, Li, List } from './ContactList.styled';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteBtnClick }) => {
  return (
    <List>
      {contacts.map(({ name, id, phone }) => {
        return (
          <Li key={id}>
            {name}: {phone}
            <Button type="button" onClick={() => onDeleteBtnClick(id)}>
              Delete
            </Button>
          </Li>
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  onDeleteBtnClick: PropTypes.func.isRequired,
};

export default ContactList;
