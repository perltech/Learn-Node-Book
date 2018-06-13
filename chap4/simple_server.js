const fs = require("fs");
const http = require("http");
const PORT = 8080;

const loadAlbumList = cb => {
    //Assuming every directory in "albums" is, in fact, an album
    fs.readdir("albums", (err, files) => {
        if (err) {
            cb(err);
            return;
        }
        cb(null, files);
    });
};

const handleIncomingRequest = (req, res) => {
    console.log(`INCOMING REQUEST: ${req.method} ${req.url}`);
    loadAlbumList((err, albums) => {
        if (err) {
            res.writeHead(503, { "Content-Type": "application/json" });
            res.end(JSON.stringify(err + "\n"));
            return;
        }
        const out = { error: null, data: { albums: albums } };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(out) + "\n");
    });

};

const server = http.createServer(handleIncomingRequest);
server.listen(PORT);
console.log(`Listening: ${PORT}`);