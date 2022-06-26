import Jimp from "jimp";
import robot from "robotjs";

const createScreenshot = async () => {
  const mousePos = robot.getMousePos();
  const size = 200;
  const image = robot.screen.capture(mousePos.x, mousePos.y, size, size).image;
  const pngImage = new Jimp(size * 2, size * 2);

  pngImage.bitmap.data = image;

  const screenshot = await pngImage.getBufferAsync(Jimp.MIME_PNG);

  return screenshot;
};

export default createScreenshot;
