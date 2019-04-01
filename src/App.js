import React from 'react';
import './App.css';
import * as d3 from 'd3';
import 'd3-selection-multi';
import styled from 'styled-components';
import StartButton from './components/StartButton';
import useForceUpdate from 'use-force-update';
import Rocket from './assets/Rocket';
// import { ReactComponent as Rocket } from './assets/rocket.svg';

const FIREWORK_DURATION = 1000;
const LAUNCHER_WIDTH = 58;
const LAUNCHER_HEIGHT = 58;
const FIREWORK_HEIGHT = 20;

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
      // firework x = launcher current x gets current x)
      // (getBBox for svg, getBoundingClientRect for HTML elements)
      d3
        .select('#rocket')
        .node()
        .getBoundingClientRect().x,
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

const ALIENS_TICK_SPEED_MS = 1000;
const handleStartClick = ({
  started,
  setStarted,
  setAliens,
  aliensProgress,
  aliensProgressTimer,
  forceUpdate,
}) => {
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

    aliensProgressTimer.current = setInterval(() => {
      aliensProgress.current += 1;
      forceUpdate();
    }, ALIENS_TICK_SPEED_MS);
  }
};

const AlienStyles = styled.rect`
  fill: limegreen;
`;

const ALIEN_PADDING = 20;
const ALIEN_MOVE_X = 20;
const Alien = ({ idx, alien, aliensProgress }) => {
  const { type, size, zapsPerSec } = alien;

  const callback = () => {
    console.log('ow!');
  };

  var options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 1.0,
  };

  var observer = new IntersectionObserver(callback, options);

  return (
    <AlienStyles
      x={100 * idx + ALIEN_PADDING + ALIEN_MOVE_X * aliensProgress.current}
      y={ALIEN_PADDING}
      width={50 * size}
      height={50 * size}
    />
  );
};

const SVGStyles = styled.svg`
  .launcher,
  .rocket {
    transition: all 2.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  .firework {
    stroke: white;
    transition: all ${FIREWORK_DURATION}s cubic-bezier(0.94, 0.46, 0.45, 0.25);
  }
`;

const App = () => {
  const [launcherLeft, setLauncherLeft] = React.useState(minLeft);
  const [started, setStarted] = React.useState(false);
  const [aliens, setAliens] = React.useState([]);
  const aliensProgress = React.useRef(0);
  const forceUpdate = useForceUpdate();

  const aliensProgressTimer = React.useRef(null);

  return (
    <div onMouseMove={event => handleMouseMove({ event, setLauncherLeft })}>
      <div className="background">
        <div className="container" onClick={event => handleClick({ event })}>
          <SVGStyles>
            <Rocket
              className="rocket"
              x={launcherLeft}
              y={minY}
              width={LAUNCHER_WIDTH}
              height={LAUNCHER_HEIGHT}
            />
            {aliens.map((alien, idx) => {
              return (
                <Alien
                  key={alien.name}
                  alien={alien}
                  idx={idx}
                  aliensProgress={aliensProgress}
                />
              );
            })}
          </SVGStyles>
        </div>
      </div>
      <StartButton
        started={started}
        onClick={() =>
          handleStartClick({
            started,
            setStarted,
            setAliens,
            aliensProgress,
            aliensProgressTimer,
            forceUpdate,
          })
        }
      />
    </div>
  );
};

export default App;
