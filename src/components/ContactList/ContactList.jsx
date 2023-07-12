import React from 'react';
import { Button, Li, List } from './ContactList.styled';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteBtnClick }) => {
  return (
    <List>
      {contacts.map(({ name, id, number }) => {
        return (
          <Li key={id}>
            {name}: {number}
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
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteBtnClick: PropTypes.func.isRequired,
};

export default ContactList;
