const http = require("http");
var fs = require("fs");
const replace = require("./replace");

const server = http.createServer(function (req, res) {
    var js = fs.readFileSync("./data.json");
    if (req.url.split("?")[0] == "/products") {
        res.writeHead(200, { "content-type": "text/html" });
        var data = replace.replace("template-product.html" , req.url.split("=")[1]);
        res.write(data);
    }
    else if (req.url == "/overview" || req.url == "/") {
        res.writeHead(200, { "content-type": "text/html" });
        var overveiw = fs.readFileSync("./templates/template-overview.html").toString();
        var data = " ";
        for (var i = 0; i <= 4; i++)
            data += replace.replace("template-card.html", i);

       overveiw =  overveiw.replace("{%PRODUCT_CARDS%}" , data);
        res.write(overveiw);

    }
    else if (req.url == "/api") {

        res.write(js);
    }
    else {
        res.write("ERROR 404");
    }
    res.end();
});

var port = process.env.PORT||80;
server.listen(port);
console.log("Success");
