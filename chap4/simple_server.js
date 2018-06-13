const fs = require("fs");
const http = require("http");
const PORT = 8080;

const loadAlbumList = cb => {
    fs.readdir("albums", (err, files) => {
        if (err) {
            cb(err);
            return;
        }

        let onlyDirs = [];

        const iterator = (index) => {
            if (index === files.length) {
                cb(null, onlyDirs);
                return;
            }
            fs.stat(`albums/${files[index]}`, (err, stats) => {
                if (err) {
                    cb(err);
                    return;
                }
                if (stats.isDirectory()) {
                    onlyDirs.push(files[index]);
                }
                iterator(index + 1);
            });
        };
        iterator(0);
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