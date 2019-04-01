import React from 'react';
import './App.css';
import { Transition } from 'react-transition-group';
import * as d3 from 'd3';
import 'd3-selection-multi';
import styled from 'styled-components';

const FIREWORK_DURATION = 1000;
const LAUNCHER_WIDTH = 20;
const LAUNCHER_HEIGHT = 40;
const FIREWORK_HEIGHT = 20;

// launcher left offset
const launcherOffsetLeft = window.innerWidth * 0.05 + LAUNCHER_WIDTH / 2;

// left / right constraints for launcher
const minLeft = 0;
const maxLeft = window.innerWidth * 0.9 - LAUNCHER_WIDTH;

// height constraints for fireworks
const minY = window.innerHeight * 0.8 - LAUNCHER_HEIGHT;
const maxY = 0;
const deltaY = minY - maxY;

const handleMouseMove = ({ event, setLauncherLeft }) => {
  const mouseX = event.pageX;
  const newLeft = Math.min(
    Math.max(mouseX - launcherOffsetLeft, minLeft),
    maxLeft,
  );
  setLauncherLeft(newLeft);
};

const handleClick = ({ event, launcherObserver }) => {
  // MutationObserver config
  const config = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['x1,x2,y1,y2'],
  };
  // Start observing the launcher node and listen for changes to attributes x and y
  // while recording old values.
  launcherObserver.observe(d3.select('.launcher').node(), config);

  const clickCoords = {
    x:
      d3
        .select('.launcher')
        .node()
        .getBBox().x +
      LAUNCHER_WIDTH / 2,
  };

  const firework = d3
    .select('svg')
    .append('line')
    .attrs({
      class: `firework`,
      x1: clickCoords.x,
      x2: clickCoords.x,
      y1: minY,
      y2: minY - FIREWORK_HEIGHT,
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

const SVGStyles = styled.svg`
  .launcher {
    fill: rebeccapurple;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  .firework {
    stroke: white;
    transition: all ${FIREWORK_DURATION}s cubic-bezier(0.94, 0.46, 0.45, 0.25);
  }
  .firework-launched {
  }
`;

const App = () => {
  const [launcherLeft, setLauncherLeft] = React.useState(minLeft);
  const [fireworkLeft, setFireworkLeft] = React.useState(0);

  // Create a new MutationObserver.
  // This one just logs changes to attributes.
  var launcherObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      console.log(
        m.attributeName +
          ' -- old:' +
          m.oldValue +
          ', new: ' +
          m.target.getAttribute(m.attributeName),
      );
    });
  });

  return (
    <div onMouseMove={event => handleMouseMove({ event, setLauncherLeft })}>
      <div class="background">
        <div
          class="container"
          onClick={event => handleClick({ event, launcherObserver })}
        >
          <SVGStyles>
            <rect
              class="launcher"
              x={launcherLeft}
              y={minY}
              width={LAUNCHER_WIDTH}
              height={LAUNCHER_HEIGHT}
            />
          </SVGStyles>
        </div>
      </div>
    </div>
  );
};

export default App;
