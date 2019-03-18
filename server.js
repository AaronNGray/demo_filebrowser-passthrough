var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var morgan = require('morgan');
var logger = require('http-logger');
var request = require('request');
var express = require('express');
var app = express();

var serverUrl = "https://www.jstree.com/demo_filebrowser/index.php";

app.set('port', 80);

var documentRoot = require('path').resolve(__dirname + "/public/");

app.use(morgan('combined'));


app.get("/index.html", function(req, res, next) {
    var operation = req.query.operation;

    if (operation == "get_node") {
        var id = req.query.id;
        var uri = buildQuery(serverUrl, {
            operation: "get_node",
            id: id
        });
        console.log("uri = ", uri);
        request(uri , function (error, response, body) {
            //console.log('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //console.log('body:', body); // Print the HTML for the Google homepage.
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(body);
        });
    }
    else if (operation == "create_node") {
        var id = req.query.id;
        var type = req.query.type;
        var text = req.query.text;

        var uri = buildQuery(serverUrl, {
            operation: operation,
            id: id,
            type: type,
            text: text
        });
        request(uri , function (error, response, body) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(body);
        });
    }
    else if (operation == "delete_node") {
        var id = req.query.id;
        var text = req.query.text;

        var uri = buildQuery(serverUrl, {
            operation: operation,
            id: id,
            text: text
        });
        request(uri , function (error, response, body) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(body);
        });
    }
    else if (operation == "rename_node") {
        var id = req.query.id;
        var text = req.query.text;

        var uri = buildQuery(serverUrl, {
            operation: operation,
            id: id,
            text: text
        });
        request(uri , function (error, response, body) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(body);
        });
    }
    else if (operation == "move_node") {
        var id = req.query.id;
        var parent = req.query.parent;

        var uri = buildQuery(serverUrl, {
            operation: operation,
            id: id,
            parent: parent
        });
        request(uri , function (error, response, body) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(body);
        });
    }
    else if (operation == "copy_node") {
        var id = req.query.id;
        var parent = req.query.parent;

        var uri = buildQuery(serverUrl, {
            operation: operation,
            id: id,
            parent: parent
        });
        request(uri , function (error, response, body) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(body);
        });
    }
    else if (operation == "get_content") {
        var id = req.query.id;

        var uri = buildQuery(serverUrl, {
            operation: operation,
            id: id
        });
        request(uri , function (error, response, body) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(body);
        });
    }
    else
        next();
});

app.use(serveIndex(documentRoot));
app.use(serveStatic(documentRoot));


app.listen(
  app.get('port'),
  function() {
    console.log('Express server listening on port ' + app.get('port'));
  }
);

function getSearch(url) {
    return url.split('?')[1];
}

function buildQuery(url, params) {
    var query = "?";
    if (typeof url === "Object") {
        params = url;
        params = null;
    }
    else
        query = url + "?";

    for (var param in params)
        query = query + "&" + param + "=" + encodeURIComponent(params[param]);
    return query;
}
