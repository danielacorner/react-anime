import React from 'react';
import './App.css';
import * as d3 from 'd3';
import 'd3-selection-multi';
import styled from 'styled-components';
import StartButton from './components/StartButton';
import useForceUpdate from 'use-force-update';
import Rocket from './assets/Rocket';
import Alien from './components/Alien';
import {
  LAUNCHER_HEIGHT,
  LAUNCHER_OFFSET_LEFT,
  MIN_LEFT,
  MAX_LEFT,
  FIREWORK_HEIGHT,
  FIREWORK_DURATION,
  ALIEN_MOVE_X,
  SCREEN_X_LEFT,
  SCREEN_X_RIGHT,
  ALIENS_TICK_SPEED_MS,
  LAUNCHER_WIDTH,
  ALIENS_LEVEL_1,
  ALIEN_WIDTH
} from './components/constants';
// import { ReactComponent as Rocket } from './assets/rocket.svg';

// height constraints for fireworks
const minY = window.innerHeight * 0.8 - LAUNCHER_HEIGHT;
const maxY = 0;

const handleMouseMove = ({ event, setLauncherLeft }) => {
  const mouseX = event.pageX;
  const newLeft = Math.min(
    Math.max(mouseX - LAUNCHER_OFFSET_LEFT, MIN_LEFT),
    MAX_LEFT
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
        .getBoundingClientRect().x
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
      y2: minY + FIREWORK_HEIGHT
    });

  // TODO: when shot fired, create intersection observer for each alien, then scrap them when the shot is removed (useEffect?)
  const AlienWasHitCallback = aln => {
    console.log('ow!');
  };
  const aliens = Array.from(document.querySelectorAll('.alien'));
  const observersArray = aliens.map(aln => {
    const options = {
      root: aln,
      rootMargin: '0px',
      threshold: 1.0
    };
    return new IntersectionObserver(() => AlienWasHitCallback(aln), options);
  });

  observersArray.forEach((obs, idx) =>
    obs.observe(document.querySelector('.firework'))
  );

  setTimeout(() => {
    firework
      .transition()
      .duration(FIREWORK_DURATION)
      .attrs({
        class: `firework firework-launched`,
        x1: clickCoords.x,
        x2: clickCoords.x,
        y1: maxY,
        y2: maxY - FIREWORK_HEIGHT
      })
      .remove();
  });
};

const updateAlienPositions = ({
  areAliensMovingRight,
  aliensProgressY,
  aliensProgressX,
  alienRects,
  forceUpdate
}) => {
  alienRects.current = Array.from(document.querySelectorAll('.alien')).map(
    aln => aln.getBoundingClientRect()
  );

  let didAliensHitSide = false;
  alienRects.current.forEach((aln, idx) => {
    if (idx === 0) {
      console.log(aln.left - ALIEN_MOVE_X, SCREEN_X_LEFT);
    }
    if (
      aln.left - ALIEN_MOVE_X < SCREEN_X_LEFT ||
      aln.right + ALIEN_MOVE_X > SCREEN_X_RIGHT
    ) {
      didAliensHitSide = true;
    }
  });

  if (didAliensHitSide) {
    aliensProgressY.current++;
    areAliensMovingRight.current = !areAliensMovingRight.current;
    console.log(aliensProgressY, areAliensMovingRight);
  }
  areAliensMovingRight.current
    ? aliensProgressX.current++
    : aliensProgressX.current--;
  forceUpdate();
};

const handleStartClick = ({
  started,
  setStarted,
  setAliens,
  areAliensMovingRight,
  aliensProgressY,
  aliensProgressX,
  alienRects,
  aliensProgressTimer,
  forceUpdate
}) => {
  if (!started) {
    setStarted(true);

    // TODO: first, second, third rows
    setAliens(ALIENS_LEVEL_1);

    aliensProgressTimer.current = setInterval(
      () =>
        updateAlienPositions({
          areAliensMovingRight,
          aliensProgressY,
          aliensProgressX,
          alienRects,
          forceUpdate
        }),
      ALIENS_TICK_SPEED_MS
    );
  }
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
  const [launcherLeft, setLauncherLeft] = React.useState(MIN_LEFT);
  const [started, setStarted] = React.useState(false);
  const [aliens, setAliens] = React.useState([]);
  const areAliensMovingRight = React.useRef(true);
  const aliensProgressX = React.useRef(1);
  const aliensProgressY = React.useRef(0);
  const alienRects = React.useRef(null);
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
                  key={alien.order}
                  alien={alien}
                  idx={idx}
                  aliensProgressX={aliensProgressX}
                  aliensProgressY={aliensProgressY}
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
            areAliensMovingRight,
            aliensProgressX,
            aliensProgressY,
            alienRects,
            aliensProgressTimer,
            forceUpdate
          })
        }
      />
    </div>
  );
};

export default App;
