const http = require("http");
const PORT = 8080;

const handleIncomingRequest = (req, res) => {
    console.log(`INCOMING REQUEST: ${req.method} ${req.url}`);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: null }) + "\n");
};

const server = http.createServer(handleIncomingRequest);
server.listen(PORT);
console.log(`Listening: ${PORT}`);