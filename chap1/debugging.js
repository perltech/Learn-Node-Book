const http = require("http");
const PORT = 8080;

const process_request = (req, res) => {
    const body = "Thanks for calling!\n";
    let contentLength = body.lengtth;

    res.writeHead(200, {
        "Content-Length": contentLength,
        "Content-Type": "text/plain"
    });
    res.end(body);
};

const server = http.createServer(process_request);
server.listen(PORT);
console.log(`Listening: ${PORT}`);