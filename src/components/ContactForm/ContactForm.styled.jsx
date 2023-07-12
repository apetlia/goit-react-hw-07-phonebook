import styled from '@emotion/styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const FormStyled = styled(Form)`
  padding: 15px;
  width: 350px;
  margin-bottom: 30px;

  display: inline-flex;
  gap: 25px;
  flex-direction: column;
  justify-content: center;

  border-radius: 5px;
  border: 1px solid ${p => p.theme.colors.silver};
`;

const FieldStyled = styled(Field)`
  display: block;
  width: 100%;

  border-radius: 5px;
  border: 1px solid ${p => p.theme.colors.silver};
  padding: 5px;
`;

const ErrorMessageStyled = styled(ErrorMessage)`
  position: absolute;
  color: red;
  top: 0;
  right: 0;
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: none;

  font-size: 16px;
  background-color: ${p => p.theme.colors.whiteSmoke};

  :active {
    color: ${p => p.theme.colors.white};
    background-color: ${p => p.theme.colors.gray};
  }
`;

export const Label = styled.label`
  position: relative;
`;

export { Formik, FormStyled, FieldStyled, ErrorMessageStyled };
