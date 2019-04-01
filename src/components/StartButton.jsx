import React from 'react';
import styled from 'styled-components';

const BTN_HEIGHT = 50;
const BTN_WIDTH = 200;

const StartButtonStyles = styled.button`
  position: absolute;
  height: ${BTN_HEIGHT}px;
  width: ${BTN_WIDTH}px;
  bottom: ${window.innerHeight * 0.05 - BTN_HEIGHT / 2}px;
  left: calc(50% - ${BTN_WIDTH / 2}px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid hsl(60, 70%, 50%);
  color: hsl(60, 70%, 50%);
  border-radius: 20px;
  font-family: system-ui;
  font-size: 1.4rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:not(:disabled) {
    &:hover {
      bottom: ${window.innerHeight * 0.05 - BTN_HEIGHT / 2 + 2}px;
      box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.5);
      border: 3px solid hsl(60, 70%, 70%);
      color: hsl(60, 70%, 70%);
      background: rgba(255, 255, 255, 0.6);
      font-weight: bold;
      animation: wobble 0.3s alternate ease-in-out infinite;
    }
  }
  &:disabled {
    color: hsl(60, 70%, 30%);
    border: 1px solid hsl(60, 70%, 30%);
  }
  &:active {
    bottom: ${window.innerHeight * 0.05 - BTN_HEIGHT / 2 - 2}px;
    box-shadow: 0px 0px 5px 5px hsl(60, 70%, 50%);
    animation: none;
  }

  @keyframes wobble {
    from {
      transform: scale(1.1) rotate(-2deg);
    }
    to {
      transform: scale(1.1) rotate(2deg);
    }
  }
`;

export default ({ started, onClick }) => (
  <StartButtonStyles
    className={'btnStart' + started ? ' started' : ''}
    disabled={started}
    onClick={onClick}
  >
    {started ? 'GOOD LUCK!' : 'START'}
  </StartButtonStyles>
);
