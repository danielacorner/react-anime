import React from 'react';
import styled from 'styled-components';
import {
  ALIEN_WIDTH,
  ALIEN_PADDING,
  ALIEN_MOVE_X,
  ALIEN_MOVE_Y,
} from './constants';
import Alien1 from '../assets/Alien1';

const AlienStyles = styled.g`
  fill: limegreen;
  * {
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
`;

const Alien = ({ idx, alien, aliensProgressX, aliensProgressY }) => {
  const { type, size, zapsPerSec } = alien;

  return (
    <AlienStyles className="alien">
      <rect
        x={
          ALIEN_WIDTH * idx +
          ALIEN_PADDING +
          ALIEN_MOVE_X * aliensProgressX.current
        }
        y={ALIEN_PADDING + ALIEN_MOVE_Y * aliensProgressY.current}
        width={(ALIEN_WIDTH / 2) * size}
        height={(ALIEN_WIDTH / 2) * size}
      />
      <Alien1
        x={
          ALIEN_WIDTH * idx +
          ALIEN_PADDING +
          ALIEN_MOVE_X * aliensProgressX.current
        }
        y={ALIEN_PADDING + ALIEN_MOVE_Y * aliensProgressY.current}
        width={(ALIEN_WIDTH / 2) * size}
        height={(ALIEN_WIDTH / 2) * size}
      />
    </AlienStyles>
  );
};
export default Alien;
