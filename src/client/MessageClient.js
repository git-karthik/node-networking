const net = require("net");
const readline = require("readline");

class MessageClient {
  constructor(connectOpts) {
    if (
      !connectOpts.serverhost ||
      !connectOpts.port ||
      isNaN(connectOpts.port)
    ) {
      throw new Error(
        `Invalid connection data. Connection credentials cannot be empty!!!`
      );
    }
    this.serverhost = connectOpts.serverhost;
    this.port = connectOpts.port;
    this.socket = new net.Socket();
    this.init();
    this.messagepacket = { clientName: `${connectOpts.clientName}` };

    readline
      .createInterface({
        input: process.stdin,
      })
      .on("line", (line) => {
        this.messagepacket.message = line;
        this.socket.write(JSON.stringify(this.messagepacket));
      });
  }

  init() {
    let connectOpts = { host: this.serverhost, port: this.port };
    this.socket.connect(connectOpts, () => {
      console.log(
        `Client successfully connected to ${connectOpts.host}: ${connectOpts.port}`
      );
    });

    this.socket.on("data", (data) => {
      console.log(`Received: ${data}`);
    });

    this.socket.on("close", () => {
      console.log("Connection closed");
      process.exit();
    });

    this.socket.on("error", (err) => {
      if (["ECONNREFUSED", "ECONNRESET"].includes(err.code)) {
        console.error(`A problem occurred while connecting to the server...`);
      } else {
        console.error(err);
      }
    });
  }
}

module.exports = MessageClient;
