const projectRoot = require('path').resolve(__dirname, '..');
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp', '.wav': 'audio/wav' };
http.createServer((req, res) => {
    let requested;
    try { requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400).end('Invalid URL'); return; }
    if (requested === '/') requested = '/index.html';
    const file = path.resolve(projectRoot, '.' + requested);
    if (!file.startsWith(projectRoot + path.sep)) { res.writeHead(403).end(); return; }
    fs.readFile(file, (err, content) => {
        if (err) { res.writeHead(404).end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
        res.end(content);
    });
}).listen(8765, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:8765/Pages/HomePage.html'));
