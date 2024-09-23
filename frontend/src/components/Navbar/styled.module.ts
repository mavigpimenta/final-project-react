import styled from "styled-components";

interface DropdownMenuProps {
    isOpen: boolean;
}

interface UserIconProps {
    bgColor: string;
}

export const NavbarContainer = styled.div`
  height: 12vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-color);
  position: relative; 
  margin-bottom: 20px; 

  &::after {
    content: "";
    background-image: url("/ColorBar.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
  }

  @media (min-width: 1024px) {
    margin-bottom: 40px;
  }
`;

export const NavbarContent = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px; 

  @media (min-width: 320px) {
    padding: 0;
  }
`;

export const Image = styled.div`
  height: 50px;
  padding-left: 25px;
  display: flex;
  align-items: center; 

  @media (min-width: 320px) {
    width: 40%
  }
`;

export const DarkModeButton = styled.button`
  background-color: transparent; 
  border-style: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const DarkModeImage = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 20px;
`;

export const IconsContainer = styled.div`
    display: flex;
    align-items: center;
    padding-right: 25px; 
`;

export const UserIconContainer = styled.div`
  position: relative;
  margin-left: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const UserIcon = styled.div<UserIconProps>`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor || "#ccc"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
`;

export const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: var(--bg-color);
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 150px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 10;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
