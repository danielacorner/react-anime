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
  ROCKET_HEIGHT,
  ROCKET_OFFSET_LEFT,
  MIN_LEFT,
  MAX_LEFT,
  MISSILE_HEIGHT,
  MISSILE_DURATION,
  ALIEN_MOVE_X,
  SCREEN_X_LEFT,
  SCREEN_X_RIGHT,
  ALIENS_TICK_SPEED_MS,
  ROCKET_WIDTH,
  ALIENS_LEVEL_1,
  ALIEN_WIDTH,
} from './components/constants';
// import { ReactComponent as Rocket } from './assets/rocket.svg';

// height constraints for missiles
const minY = window.innerHeight * 0.8 - ROCKET_HEIGHT;
const maxY = 0;

const handleMouseMove = ({ event, setLauncherLeft }) => {
  const mouseX = event.pageX;
  const newLeft = Math.min(
    Math.max(mouseX - ROCKET_OFFSET_LEFT, MIN_LEFT),
    MAX_LEFT,
  );
  setLauncherLeft(newLeft);
};

const handleClick = ({ event }) => {
  const clickCoords = {
    x:
      // missile x = launcher current x gets current x)
      // (getBBox for svg, getBoundingClientRect for HTML elements)
      d3
        .select('#rocket')
        .node()
        .getBoundingClientRect().x,
  };

  const missileX = clickCoords.x - ROCKET_WIDTH / 2 - 2;

  const missile = d3
    .select('svg')
    .insert('line')
    // move the line under the launcher
    .lower()
    .attrs({
      class: `missile`,
      x1: missileX,
      x2: missileX,
      y1: minY,
      y2: minY + MISSILE_HEIGHT,
    });

  const AlienWasHitCallback = ({ aln, missile }) => {
    console.log('ow!', aln);
    aln.remove();
    missile.remove();
  };

  setTimeout(() => {
    missile
      .transition()
      .duration(MISSILE_DURATION)
      .attrs({
        class: `missile missile-launched`,
        x1: missileX,
        x2: missileX,
      })
      .tween('attr.y1', function() {
        const i = d3.interpolate(this.getAttribute('y1'), maxY);
        return function(t) {
          const y1 = this.getAttribute('y1');
          const x = this.getAttribute('x1');
          const aliens = Array.from(document.querySelectorAll('.alien'));
          aliens.forEach(aln => {
            const bb = aln.getBoundingClientRect();
            if (bb.left < x && bb.right > x && bb.bottom > y1) {
              AlienWasHitCallback({ aln, missile });
            }
          });
          this.setAttribute('y1', i(t));
        };
      })
      .tween('attr.y2', function() {
        const i = d3.interpolate(
          this.getAttribute('y2'),
          maxY - MISSILE_HEIGHT,
        );
        return function(t) {
          this.setAttribute('y2', i(t));
        };
      })
      .remove();
  });
};

const updateAlienPositions = ({
  areAliensMovingRight,
  aliensProgressY,
  aliensProgressX,
  alienRects,
  forceUpdate,
}) => {
  alienRects.current = Array.from(document.querySelectorAll('.alien')).map(
    aln => aln.getBoundingClientRect(),
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
  forceUpdate,
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
          forceUpdate,
        }),
      ALIENS_TICK_SPEED_MS,
    );
  }
};

const SVGStyles = styled.svg`
  .launcher,
  .rocket {
    transition: all 2.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  .missile {
    stroke: white;
    transition: all ${MISSILE_DURATION}s cubic-bezier(0.94, 0.46, 0.45, 0.25);
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
              width={ROCKET_WIDTH}
              height={ROCKET_HEIGHT}
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
            forceUpdate,
          })
        }
      />
    </div>
  );
};

export default App;
