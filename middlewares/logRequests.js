const fs = require('fs');
const path = require('path');

const logRequests = (req, res, next) => {
    const { method, url, ip } = req;
    const origin = req.headers.origin || 'unknown';
    const log = `${method} ${url} ${origin} ${new Date().toISOString()} ${ip}\n`;
    const logsDir = path.join(__dirname, '../logs');
    const logFilePath = path.join(logsDir, 'requests.txt');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true }); 
    }
    if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, ''); 
    }
    fs.appendFile(logFilePath, log, (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
}

module.exports = logRequests;