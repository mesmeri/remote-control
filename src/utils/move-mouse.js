import robot from "robotjs";

const moveMouse = (direction, distance) => {
  const mousePos = robot.getMousePos();
  const coords = { x: mousePos.x, y: mousePos.y };

  switch (direction) {
    case "mouse_up": {
      coords.y = coords.y - distance;
      break;
    }
    case "mouse_down": {
      coords.y = coords.y + distance;
      break;
    }
    case "mouse_left": {
      coords.x = coords.x - distance;
      break;
    }
    case "mouse_right": {
      coords.x = coords.x + distance;
      break;
    }
    default:
  }

  robot.moveMouseSmooth(coords.x, coords.y);
};

export default moveMouse;
