import robot from "robotjs";

const drawStraightLine = (startCoords, endCoords, delay = 3) => {
  robot.setMouseDelay(delay);

  const isHorizontalLine =
    startCoords.x !== endCoords.x && startCoords.y === endCoords.y;
  const isVerticalLine =
    startCoords.y !== endCoords.y && startCoords.x === endCoords.x;

  if (isHorizontalLine) {
    const direction = startCoords.x - endCoords.x > 0 ? "left" : "right";

    if (direction === "left") {
      for (let i = startCoords.x; i >= endCoords.x; i--) {
        robot.mouseToggle("down");
        robot.dragMouse(i, endCoords.y);
        robot.mouseToggle("up");
      }
    }

    if (direction === "right") {
      for (let i = startCoords.x; i <= endCoords.x; i++) {
        robot.mouseToggle("down");
        robot.dragMouse(i, endCoords.y);
        robot.mouseToggle("up");
      }
    }
  }

  if (isVerticalLine) {
    const direction = startCoords.y - endCoords.y > 0 ? "up" : "down";

    if (direction === "down") {
      for (let i = startCoords.y; i <= endCoords.y; i++) {
        robot.mouseToggle("down");
        robot.dragMouse(endCoords.x, i);
        robot.mouseToggle("up");
      }
    }

    if (direction === "up") {
      for (let i = startCoords.y; i >= endCoords.y; i--) {
        robot.mouseToggle("down");
        robot.dragMouse(endCoords.x, i);
        robot.mouseToggle("up");
      }
    }
  }
};

export default drawStraightLine;
