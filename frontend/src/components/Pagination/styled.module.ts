import styled from "styled-components";

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

export const PageButton = styled.button`
    margin: 0 5px;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    &:disabled {
      background-color: #005f8c;
      color: #999;
      cursor: not-allowed;
      box-shadow: none;
    }
    
    &:hover:not(:disabled) {
        background-color: #f0f0f0;
        transform: translateY(-2px);
      }
      
      &:active:not(:disabled) {
        color: #000000;
        transform: translateY(1px);
    }
`;
