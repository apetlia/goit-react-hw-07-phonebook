import React from 'react';
import PropTypes from 'prop-types';

import {
  Formik,
  FormStyled,
  FieldStyled,
  ErrorMessageStyled,
  Button,
  Label,
} from './ContactForm.styled';

import * as Yup from 'yup';

const phoneRegex = /^\+?[0-9 -]{6,22}$/;

const nameRegex = /^[a-zA-Zа-яА-Я '-]*$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().matches(nameRegex, 'Invalid name').required('Required'),
  phone: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .required('Required'),
});

const initialValues = { name: '', phone: '' };

const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormStyled>
        <Label>
          Name
          <FieldStyled
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessageStyled name="name" component="div" />
        </Label>
        <Label>
          Number
          <FieldStyled
            type="tel"
            name="phone"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <ErrorMessageStyled name="phone" component="div" />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormStyled>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
