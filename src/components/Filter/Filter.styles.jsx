import styled from '@emotion/styled';

export const Label = styled.label`
  margin-bottom: 30px;
  display: block;
  width: 300px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;

  border-radius: 5px;
  border: 1px solid ${p => p.theme.colors.silver};
  padding: 5px;
`;
