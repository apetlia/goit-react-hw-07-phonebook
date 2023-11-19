import styled from '@emotion/styled';

export const List = styled.ul`
  padding-left: 30px;
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Li = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ::before {
    content: '';
    position: absolute;
    left: -15px;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    background: black;
  }
`;

export const Button = styled.button`
  height: 30px;
  width: 100px;
  border-radius: 5px;
  border: none;

  font-size: 16px;
  background-color: ${p => p.theme.colors.whiteSmoke};

  :active {
    color: ${p => p.theme.colors.white};
    background-color: ${p => p.theme.colors.gray};
  }
`;
