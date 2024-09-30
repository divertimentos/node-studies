const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    console.log(req);
    console.log(res);
    // res.statusCode(200);
    console.log("Hello from server!");
    res.end();
  }
});

server.listen(3001, () => {
  console.log("Server on http://localhost:3001");
});
