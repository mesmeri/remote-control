import robot from "robotjs";

import drawStraightLine from "./draw-straight-line.js";

const drawRect = (width, height) => {
  const mousePos = robot.getMousePos();

  const x1 = mousePos.x + width;
  const y1 = mousePos.y;

  const x2 = x1;
  const y2 = y1 + height;

  const x3 = x2 - width;
  const y3 = y2;

  const x4 = mousePos.x;
  const y4 = mousePos.y;

  drawStraightLine({ x: mousePos.x, y: mousePos.y }, { x: x1, y: y1 });
  drawStraightLine({ x: x1, y: y1 }, { x: x2, y: y2 });
  drawStraightLine({ x: x2, y: y2 }, { x: x3, y: y3 });
  drawStraightLine({ x: x3, y: y3 }, { x: x4, y: y4 });
};

export default drawRect;
