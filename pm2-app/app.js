const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 4000;
const logFile = path.join(__dirname, 'app.log');
const errorFile = path.join(__dirname, 'error.log');

function logMessage(message, isError = false) {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] ${message}\n`;
    
    if (isError) {
        fs.appendFileSync(errorFile, log);
        console.error(log);
    } else {
        fs.appendFileSync(logFile, log);
        console.log(log);
    }
}

function runApp() {
    setInterval(() => {
        const shouldFail = Math.random() < 0.3; // 30% chance to fail
        
        if (shouldFail) {
            logMessage('Random failure occurred!', true);
        } else {
            logMessage('App executed successfully.');
        }
    }, Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000);
}

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`App is running on port ${PORT}\n`);
});

server.listen(PORT, () => {
    logMessage(`Server is running on port ${PORT}`);
});

runApp();
