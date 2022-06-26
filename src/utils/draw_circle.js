import robot from "robotjs";

const drawCircle = (radius) => {
  const mousePos = robot.getMousePos();

  robot.setMouseDelay(3);

  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = mousePos.x - radius * Math.cos(i);
    const y = mousePos.y - radius * Math.sin(i);

    robot.mouseToggle("down", "left");
    robot.dragMouse(x, y);
    robot.mouseToggle("up", "left");
  }
};

export default drawCircle;
