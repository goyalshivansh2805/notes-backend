const fs = require('fs');
const path = require('path');

const logRequests = (req, res, next) => {
    const { method, url,ip } = req;
    const origin = req.headers.origin || 'unknown';
    const log = `${method} ${url} ${origin} ${new Date} ${ip}\n`;
    const logFilePath = path.join(__dirname, '../logs/requests.txt');
    
    fs.appendFile(logFilePath, log, (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
}

module.exports = logRequests;