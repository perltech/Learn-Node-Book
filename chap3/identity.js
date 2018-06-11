const fs = require("fs");

class FileObject {
    constructor() {
        this.filename = process.argv[2] || '';
    }

    file_exists(cb) {
        console.log(`About to open: ${this.filename}`);

        fs.open(this.filename, 'r', (err, handle) => {
            if (err) {
                console.log(`Can't open ${this.filename}`);
                cb(err);
                return;
            }
            fs.close(handle, () => {});
            cb(null, true);
        });
    }
}

const fo = new FileObject();
fo.filename = process.argv[2] || "file_that_does_not_exist";
fo.file_exists((err, results) => {
    if (err) {
        console.log(`\nError opening file: ${JSON.stringify(err)}`);
        return;
    }
    console.log("file exists!");
});