import Jimp from "jimp";
import { httpServer } from "./src/http_server/index.js";
import robot from "robotjs";
import { WebSocketServer } from "ws";

import drawCircle from "./src/utils/draw_circle.js";
import drawRect from "./src/utils/draw_rect.js";
import moveMouse from "./src/utils/move-mouse.js";
import createScreenshot from "./src/utils/create-screenshot.js";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (wss) => {
  wss.on("message", async (message) => {
    const command = message.toString();
    const args = command.split(" ");

    if (command.startsWith("mouse_")) {
      if (command === "mouse_position") {
        const mousePos = robot.getMousePos();

        wss.send(`${command} ${mousePos.x},${mousePos.y}`);
      } else {
        const [direction, distance] = args;

        moveMouse(direction, Number(distance));
        wss.send(`${command} \0`);
      }
    }

    if (command.startsWith("draw_circle")) {
      const radius = args[1];

      drawCircle(radius);
      wss.send(`${command} \0`);
    }

    if (command.startsWith("draw_square")) {
      const width = Number(args[1]);

      drawRect(width, width);
      wss.send(`${command} \0`);
    }

    if (command.startsWith("draw_rectangle")) {
      const width = Number(args[1]);
      const height = Number(args[2]);

      drawRect(width, height);
      wss.send(`${command} \0`);
    }

    if (command.startsWith("prnt_scrn")) {
      const screenshot = await createScreenshot();

      wss.send(`${command} ${screenshot.toString("base64")} \0`);
    }
  });
});

process.on("SIGINT", () => {
  process.stdout.write("\nWebsocket is closed. \n");
  wss.close();
  process.exit(0);
});
