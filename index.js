import Jimp from "jimp";
import { httpServer } from "./src/http_server/index.js";
import robot from "robotjs";
import { WebSocketServer } from "ws";

import drawCircle from "./src/draw_utils/draw_circle.js";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (wss) => {
  wss.on("message", (message) => {
    const command = message.toString();

    if (command.startsWith("draw_circle")) {
      const radius = command.split(" ")[1];

      drawCircle(radius);
    }
  });

  wss.send("connection response");
});
