const net = require("net");
const HOST = "localhost";
const PORT = "8383";

class MessageServer {
  constructor(serverhost, port) {
    this.serverhost = serverhost ?? HOST;
    this.port = port ?? PORT;
    this.init();
  }

  init() {
    let server = net.createServer((socket) => {
      let client = `${socket.remoteAddress}:${socket.remotePort}`;
      console.log(`Client connected: ${client}`);

      server.getConnections((err, count) => {
        if (err) {
          console.error(err, count);
        }

        console.info("Open connections:", count);
      });

      socket.on("data", (data) => {
        let messageJson = JSON.parse(data);
        console.log(
          `${messageJson.clientName} says:`,
          messageJson.message.toString("utf-8")
        );
      });

      socket.on("close", () => {
        console.log(`Connection with ${client} closed...`);
      });

      socket.on("error", (err) => {
        console.error(`Error connecting with client ${client}:`, err.message);
      });
    });

    server.listen(this.port, this.serverhost, () => {
      console.info(`Server started at: ${this.serverhost}: ${this.port}`);
    });
  }
}

module.exports = MessageServer;
