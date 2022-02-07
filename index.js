const command = process.argv[2];
const SERVER = "localhost";
const PORT = 3000;
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (command.toLowerCase() == "server") {
  let Server = require("./src/server/MessageServer");
  new Server(SERVER, PORT);
} else if (command.toLowerCase() == "client") {
  rl.question("Enter you client name| email: ", (answer) => {
    let Client = require("./src/client/MessageClient");
    let connectOpts = {
      serverhost: SERVER,
      port: PORT,
      clientName: answer,
    };
    new Client(connectOpts);
  });
}
