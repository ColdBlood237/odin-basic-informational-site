const http = require("http");
const fs = require("fs");

//Third-Party Modules
const httpStatus = require("http-status-codes");

const routeMap = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};

const port = 8000;

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "text/plain");
  response.writeHead(httpStatus.StatusCodes.OK, {
    "Content-Type": "text/html",
  });

  if (routeMap[request.url]) {
    fs.readFile(routeMap[request.url], (err, data) => {
      response.statusCode = 200;
      response.write(data);
      response.end();
    });
  } else {
    fs.readFile("404.html", (err, data) => {
      console.log(err);
      response.statusCode = 404;
      response.end(data);
    });
  }
});

server.listen(port);
console.log(`The server is listening on port: ${port}`);
