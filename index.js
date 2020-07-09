var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require("fs");
var path = require('path');
var paymentManager = require('./paymentManager');

//          (_    ,_,    _) 
//          / `'--) (--'` \
//         /  _,-'\_/'-,_  \
//        /.-'     "     '-.\
//         Julia Orion Smith

app.use(bodyParser.json())


// Declara a la carpeta "Sitio" como de acceso público
app.use('/', express.static(__dirname + '/sitio'));

app.get('/processxls', function (req, res) {
	console.log("processing")
	paymentManager.readExcel(function (response){
		res.send(response);
	});

});
app.get('/', function (req, res) {
	
	res.sendFile(path.join(__dirname + '/sitio/table.html'));

});
app.get('/graphs', function (req, res) {
	
	res.sendFile(path.join(__dirname + '/sitio/graphs1.html'));

});
app.get('/treemap', function (req, res) {
	
	res.sendFile(path.join(__dirname + '/sitio/treemap.html'));

});
app.get('/workingcopy', function (req, res) {
	res.sendFile(path.join(__dirname + '/workingcopy/cache.json'));
		

});

//PUERTO
const port = 4000; //process.env.PORT;

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!!!');
});