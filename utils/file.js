const fs = require('fs');
const url = require('url');
const path = require('path');

const deleteFile = (filePath) => {
    const file = url.parse(filePath, true);
    console.log(file.path);
    fs.unlink(file.path, (err) => {
        if (err) {
            throw err;
        }
    });
}

exports.deleteFile = deleteFile;