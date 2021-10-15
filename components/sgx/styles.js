import styled from 'styled-components';

export const Expand = styled.button`
  width: 8em;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  outline: none;
  color: #efb348;
  padding: 8px;
  display: flex;
  align-items: color-interpolation-filters;
  > svg {
    display: inline !important;
    width: 1em;
    margin-top: 0.3em;
    margin-right: 0.6em;
    transform: rotate(${props => (props.expanded ? 180 : 0)}deg);
    transition: transform 0.3s ease-in-out;
  }
`;

export const StyledBoard = styled.div`
  display: flex;
  & > div {
    flex: 1;
    margin: 0 1em;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }
`;

export const Table = styled.section`
  width: 100%;
  height: ${props =>
    props.expanded ? `${props.length * 38.25}px` : `${38.25 * 8}px`};
  transition: ${props => `height ${0.01 * props.length}s ease-in-out`};
  overflow-y: auto;
`;

export const TRow = styled.section`
  display: flex;
  width: 100%;
  > div {
    flex: 1;
    padding: 8px;
    color: #fff;
    text-align: center;
    &:first-of-type {
      flex: 0 0 160px;
    }
  }
`;

export const Thead = styled(TRow)`
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #efb348;
    font-weight: bolder;
  }
`;

export const Time = styled.p`
  text-align: center;
  margin: 0;
  padding: 1em 0;
  color: #fff;
`;
