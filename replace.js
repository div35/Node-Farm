const fs = require("fs");

module.exports.replace = function replace(filename, i) {
    var data = fs.readFileSync("./data.json").toString();
    data = JSON.parse(data)[i];

    var path = "./templates/" + filename;
    var templ = fs.readFileSync(path).toString();

    var output = templ.replace(/{%PRODUCTNAME%}/g, data.productName);
    output = output.replace(/{%IMAGE%}/g, data.image);
    output = output.replace(/{%FROM%}/g, data.from);
    output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
    output = output.replace(/{%QUANTITY%}/g, data.quantity);
    output = output.replace(/{%PRICE%}/g, data.price);
    output = output.replace(/{%DESCRIPTION%}/g, data.description);
    output = output.replace(/{%ID%}/g, data.id);

    if (data["organic"] === false) {
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }

    return output;
}