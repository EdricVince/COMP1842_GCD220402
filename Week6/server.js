const http = require("http");

const hostname = "localhost";
const port = 8080;

const server = http.createServer((req, res) => {
  console.log("Requested URL:", req.url);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("This is home Page. 001341520");
  } else if (req.url === "/student") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("This is student Page.");
  } else if (req.url === "/admin") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("This is admin Page.");
  } else if (req.url === "/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello World JSON" }));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("Invalid Request!");
  }
});

server.listen(port, hostname, () => {
  console.log(`Node.js web server at port ${port} is running...server2.js.001341520`);
});
