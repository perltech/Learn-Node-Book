const fs = require("fs");

fs.open('info.txt', 'r', (err, handle) => {
    if (err) {
        console.log(`ERROR: ${error.code} (${error.message})`);
        return;
    }

    const BUF = new Buffer.alloc(100000);

    fs.read(handle, BUF, 0, 100000, null, (err, length) => {
        if (err) {
            console.log(`ERROR: ${error.code} (${error.message})`);
            return;
        }
        console.log(BUF.toString('utf8', 0, length));
        fs.close(handle, () => {
            // 
        });
    });
});