//importing
const http = require("http");
const fs = require('fs');
const url = require('url');

const host = 'localhost';
//sets the port to the one specified in the command line. If the port is not specified then assigns 8000 as default
var port = process.argv[3] ? process.argv[3] : 8000;
//sets the root directory path to the one specified in the command line. If the root directory path  is not specified then assigns the current working directory
var dir =  process.argv[2] ? process.argv[2] : __dirname;
console.log(__dirname);

//setting up the header
var header = {
  'Content-Type': 'text',
  'Content-Length': '0',
  'Date': (new Date()).toUTCString(),
  'Connection': 'Keep-Alive',
  'Keep-Alive': 'timeout=3',
}

//event executed for every request
const requestListener = function (req, res) {
    /*
    res.writeHead is used to write the http header
    res.write is used to send the contents of the request file
    res.end is used to end the connection for the given request.
    */
    if(req.method == "GET" || req.method == "HEAD") { 
        var path = req.url;
        console.log(decodeURI(path));
        var decoded_path = decodeURI(path);
        //sets the content length of the header
        var file_size = getFileSize(decoded_path) ? getFileSize(decoded_path) : 512;
        header['Content-Length'] = file_size;
        switch (decoded_path){
            case '/':
                header["Content-Type"] = "text/html";
                res.writeHead(200, header);
                res.write(fs.readFileSync(dir + "/index.html", 'utf8'));
                res.end();
                break;
            case '/app':
                res.writeHead(302, { Location: '/login' }).end(); 
                break;
            case '/login':
                header["Content-Type"] = "text/html";
                res.writeHead(200, header);
                res.write(fs.readFileSync(dir + "/SCU Login.html", 'utf8'));
                res.end();
                break;
            case '/admin':
                header["Content-Type"] = "text/html";
                res.writeHead(403, header);
                res.end(`<html><body><h1>Error 403</h1><p>You do not have the permission to visit this file</p></body></html>`);
                break;
            case '/~':
            case '/*':
                header["Content-Type"] = "text/html";
                res.writeHead(400, header);
                res.end(`<html><body><h1>Error 400 Bad Request</h1><p>Your browser sent a request that the server couldn't understand</p></body></html>`);
                break;
            case decoded_path:
                if (fs.existsSync(dir + decoded_path)) {
                    var extension = decoded_path.split('.')
                    if(extension[extension.length-1] == "css"){
                        header["Content-Type"] = "text/css";
                        res.writeHead(200, header);
                        res.write(fs.readFileSync(dir + decoded_path));
                        res.end();
                    
                    }
                    else if(extension[extension.length-1] == "js"){
                        header["Content-Type"] = "text/javascript";
                        res.writeHead(200, header);
                        res.write(fs.readFileSync(dir + decoded_path));
                        res.end();
                    
                    }
                    else if(extension[extension.length-1] == "png"){
                        header["Content-Type"] = "image/png";
                        res.writeHead(200, header);
                        res.write(fs.readFileSync(dir + decoded_path));
                        res.end();
                    
                    }
                    else if(extension[extension.length-1] == "jpg" || extension[extension.length-1] == "jpeg"){
                        header["Content-Type"] = "image/jpeg";
                        res.writeHead(200, header);
                        res.write(fs.readFileSync(dir + decoded_path));
                        res.end();
                    }
                    else {
                        res.writeHead(200, header);
                        res.write(fs.readFileSync(dir + decoded_path));
                        res.end();
                    }
                break;
                }
                else {
                    header["Content-Type"] = "text/html";
                    res.writeHead(404, header);
                    res.end(`<html><body><h1>Error 404</h1><p>Page not found</p></body></html>`)  
                    break;
                }
                default:
                    break;
            }
    }
    else {
        header["Content-Type"] = "text/html";
        console.log(req.method + " is not allowed");
        res.writeHead(405, header);
        res.end(`<html><body><h1>Error 405</h1><p>Method not allowed</p></body></html>`);
    }
};
//gets the size of the request file
 function getFileSize(path){
    try {
        const stats = fs.statSync(path);
        return stats.size;
    } 
    catch (err) {
    console.log(err);
}
 }
 //creating the server
const server = http.createServer(requestListener);
//starting the server
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});