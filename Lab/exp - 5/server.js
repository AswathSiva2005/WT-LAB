// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//     fs.readFile('index.html', (err, data) => {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(data);
//     });
// });

// server.listen(3000, () => console.log('Server running on http://localhost:3000'));




http = require('http');
url = require('url');
querystring = require('querystring');

function onRequest(req, res) {
    var path = url.parse(req.url).pathname;
    var query = url.parse(req.url).query;
    var email = querystring.parse(query)["email"];
    var password = querystring.parse(query)["password"];

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (email == "aswathsivakm.23it@kongu.edu" && password == "23ITR010") {
        res.write("Logged in Successfully");
    } else {
        res.write("Login Failed");
    }

    res.end();
}

server = http.createServer(onRequest);
server.listen(3000, () => console.log('Server running on http://localhost:3000'));
