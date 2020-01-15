const http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    open = require("open");
port = 3000, mimeTypes = {
    html: "text/html",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    js: "text/javascript",
    css: "text/css"
}, http.createServer(function(request, response) {
    let uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);
    fs.exists(filename, function(exists) {
        return exists ? (fs.statSync(filename).isDirectory() && (filename += "/index.html"), void fs.readFile(filename, "binary", function(err, file) {
            if (err) return response.writeHead(500, {
                "Content-Type": "text/plain"
            }), response.write(err + "\n"), void response.end();
            let mimeType = mimeTypes[filename.split(".").pop()];
            mimeType || (mimeType = "text/plain"), response.writeHead(200, {
                "Content-Type": mimeType
            }), response.write(file, "binary"), response.end()
        })) : (response.writeHead(404, {
            "Content-Type": "text/plain"
        }), response.write("404 Not Found\n"), void response.end())
    })
}).listen(parseInt(port, 10), () => {

    console.log(`Server is running on port ${port} at http://localhost:${port}`)

    open(`http://localhost:${port}/test/index.html`);

});