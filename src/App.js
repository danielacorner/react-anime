import React from 'react';
import './App.css';
import { Transition } from 'react-transition-group';
import * as d3 from 'd3';
import styled from 'styled-components';

const duration = 1000;
const LAUNCHER_WIDTH = 20;
const LAUNCHER_HEIGHT = 40;
const FIREWORK_HEIGHT = 20;
const FIREWORK_WIDTH = 1;

// launcher left offset
const launcherOffsetLeft = window.innerWidth * 0.05 + LAUNCHER_WIDTH / 2;

// left / right constraints for launcher
const minLeft = 0;
const maxLeft = window.innerWidth * 0.9 - LAUNCHER_WIDTH;

// height constraints for fireworks
const minY1 = window.innerHeight * 0.8 - LAUNCHER_HEIGHT + FIREWORK_HEIGHT;
const maxY1 = window.innerHeight * 0.1;

const handleMouseMove = ({ event, setLauncherLeft }) => {
  const mouseX = event.pageX;
  const mouseY = event.pageY;

  const newLeft = Math.min(
    Math.max(mouseX - launcherOffsetLeft, minLeft),
    maxLeft,
  );

  setLauncherLeft(newLeft);
};

const handleClick = ({ event, isIn, setIsIn, setCoords }) => {
  setCoords({
    x1: event.pageX - window.innerWidth * 0.05,
    x2: event.pageX - window.innerWidth * 0.05,
    y1: minY1,
    y2: minY1 - FIREWORK_HEIGHT,
  });
  setIsIn(true);
};

const SVGStyles = styled.svg`
  .firework {
    stroke: white;
    /* stroke-width: 1px */
  }
  .launch-transition {
    transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
  }
  .launch-entering,
  .launch-exiting {
    transform: translate();
  }
`;

const App = () => {
  const [isIn, setIsIn] = React.useState(false);
  const [launcherLeft, setLauncherLeft] = React.useState(minLeft);
  const [coords, setCoords] = React.useState({
    x1: 0,
    x2: 0,
    y1: minY1,
    y2: minY1 + FIREWORK_HEIGHT,
  });

  return (
    <div onMouseMove={event => handleMouseMove({ event, setLauncherLeft })}>
      <div class="background">
        <div
          class="container"
          onClick={event => handleClick({ event, isIn, setIsIn, setCoords })}
        >
          <SVGStyles>
            <Transition in={isIn} timeout={duration} mountOnEnter unmountOnExit>
              {status => (
                <line
                  x1={coords.x1}
                  x2={coords.x2}
                  y1={coords.y1}
                  y2={coords.y2}
                  className={`firework launch-transition launch-${status}`}
                />
              )}
            </Transition>
          </SVGStyles>
          <div class="launcher" style={{ left: launcherLeft }} />
        </div>
      </div>
    </div>
  );
};

export default App;
