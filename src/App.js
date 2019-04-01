import React from 'react';
import './App.css';
import * as d3 from 'd3';
import 'd3-selection-multi';
import styled from 'styled-components';
import StartButton from './components/StartButton';

const FIREWORK_DURATION = 1000;
const LAUNCHER_WIDTH = 20;
const LAUNCHER_HEIGHT = 40;
const FIREWORK_HEIGHT = 20;

const SVGStyles = styled.svg`
  .launcher {
    fill: rebeccapurple;
    transition: all 2.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  .firework {
    stroke: white;
    transition: all ${FIREWORK_DURATION}s cubic-bezier(0.94, 0.46, 0.45, 0.25);
  }
`;

// launcher left offset
const launcherOffsetLeft = window.innerWidth * 0.05 + LAUNCHER_WIDTH / 2;

// left / right constraints for launcher
const minLeft = 0;
const maxLeft = window.innerWidth * 0.9 - LAUNCHER_WIDTH;

// height constraints for fireworks
const minY = window.innerHeight * 0.8 - LAUNCHER_HEIGHT;
const maxY = 0;

const handleMouseMove = ({ event, setLauncherLeft }) => {
  const mouseX = event.pageX;
  const newLeft = Math.min(
    Math.max(mouseX - launcherOffsetLeft, minLeft),
    maxLeft,
  );
  setLauncherLeft(newLeft);
};

const handleClick = ({ event }) => {
  const clickCoords = {
    x:
      // firework x = launcher current x (getBBox gets current x)
      d3
        .select('.launcher')
        .node()
        .getBBox().x +
      LAUNCHER_WIDTH / 2,
  };

  const firework = d3
    .select('svg')
    .insert('line')
    // move the line under the launcher
    .lower()
    .attrs({
      class: `firework`,
      x1: clickCoords.x,
      x2: clickCoords.x,
      y1: minY,
      y2: minY + FIREWORK_HEIGHT,
    });
  setTimeout(() => {
    firework
      .transition()
      .duration(FIREWORK_DURATION)
      .attrs({
        class: `firework firework-launched`,
        x1: clickCoords.x,
        x2: clickCoords.x,
        y1: maxY,
        y2: maxY - FIREWORK_HEIGHT,
      })
      .remove();
  });
};

const handleStartClick = ({ started, setStarted, setAliens }) => {
  if (!started) {
    setStarted(true);
    const aliens = [
      { type: 'cool', size: 1, zapsPerSec: 0.2, name: 'bob' },
      { type: 'cool', size: 1, zapsPerSec: 0.2, name: 'sue' },
      { type: 'cool', size: 1, zapsPerSec: 0.2, name: 'sioux' },
      { type: 'cool', size: 1, zapsPerSec: 0.2, name: 'gord' },
      { type: 'cool', size: 1, zapsPerSec: 0.2, name: 'jian' },
    ];
    setAliens(aliens);
  }
};

const AlienStyles = styled.rect`
  fill: tomato;
`;

const Alien = ({ idx, alien }) => {
  const { type, size, zapsPerSec } = alien;
  return <AlienStyles x={100} y={100} width={50 * size} height={50 * size} />;
};

const App = () => {
  const [launcherLeft, setLauncherLeft] = React.useState(minLeft);
  const [started, setStarted] = React.useState(false);
  const [aliens, setAliens] = React.useState([]);

  return (
    <div onMouseMove={event => handleMouseMove({ event, setLauncherLeft })}>
      <div className="background">
        <div className="container" onClick={event => handleClick({ event })}>
          <SVGStyles>
            <rect
              className="launcher"
              x={launcherLeft}
              y={minY}
              width={LAUNCHER_WIDTH}
              height={LAUNCHER_HEIGHT}
            />
            {aliens.map((alien, idx) => {
              return <Alien key={alien.name} alien={alien} idx={idx} />;
            })}
          </SVGStyles>
        </div>
      </div>
      <StartButton
        started={started}
        onClick={() => handleStartClick({ started, setStarted, setAliens })}
      />
    </div>
  );
};

export default App;
