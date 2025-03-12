const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    fs.readFile('message.txt', 'utf8', (err, data) => {
      if (err) {
        data = 'No message yet';
      }
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <form action="/message" method="POST">
          <label>${data}</label>
          <br>
          <input type="text" name="username">
          <button type="submit">Send</button>
        </form>
        
      `);
    });
  } else if (url === '/message' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const parsedBody = parse(body);
      const message = parsedBody.username;
      fs.writeFile('message.txt', message, err => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('An error occurred');
          return;
        }
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      });
    });
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Page Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});