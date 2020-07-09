var fs = require('fs');
var xlsx = require('node-xlsx');
 // parses a file
var rows = [];
var writeStr = "";

//          (_    ,_,    _) 
//          / `'--) (--'` \
//         /  _,-'\_/'-,_  \
//        /.-'     "     '-.\
//         Julia Orion Smith

exports.liveMenu={};

exports.readExcel=function (callback){
	var obj = xlsx.parse(__dirname + '/formatopagos.xlsx');
	jsonObject={};
	
	for(var i = 0; i < obj.length; i++)
	{
		jsonObject[obj[i].name]=[];
	    var sheet = obj[i];
	    //loop through all rows in the sheet
	    for(var j = 0; j < sheet['data'].length; j++)
	    {
	            //add the row to the rows array
	            //rows.push(sheet['data'][j]);
	            if(sheet['data'][j].length>0){
	            	jsonObject[obj[i].name].push(sheet['data'][j])
	            }
	    }
	}
	fs.writeFile('test3.json', JSON.stringify(jsonObject, null, 4),function(err) {
		console.log("miau")
		if(err) {
	        return console.log(err);
	        callback(err);
	    }
	    callback("test2.json was saved in the current directory!");
	});
	
	
}