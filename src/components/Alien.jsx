import React from 'react';
import styled from 'styled-components';
import {
  ALIEN_WIDTH,
  ALIEN_PADDING,
  ALIEN_MOVE_X,
  ALIEN_MOVE_Y
} from './constants';

const AlienStyles = styled.rect`
  fill: limegreen;
`;

const Alien = ({ idx, alien, aliensProgressX, aliensProgressY }) => {
  const { type, size, zapsPerSec } = alien;

  return (
    <AlienStyles
      className="alien"
      x={
        ALIEN_WIDTH * idx +
        ALIEN_PADDING +
        ALIEN_MOVE_X * aliensProgressX.current
      }
      y={ALIEN_PADDING + ALIEN_MOVE_Y * aliensProgressY.current}
      width={(ALIEN_WIDTH / 2) * size}
      height={(ALIEN_WIDTH / 2) * size}
    />
  );
};
export default Alien;
