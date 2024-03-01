// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

function respondTimeStamp(req, res){

	const myReceivedDate = req.params['date'].toString();
	console.log("Date got" + myReceivedDate);

	var dateRegex1 = /^[1]-[1-9]-[1-9]$/;
	var dateRegex2 = /^[1]-[1-9]-[1-2][0-9]$/;
	var dateRegex3 = /^[1]-[1-9]-[3][0-1]$/;
	var dateRegex4 = /^[1]-[1][1-2]-[1-9]$/;
	var dateRegex5 = /^[1]-[1][1-2]-[1-2][0-9]$/;
	var dateRegex6 = /^[1]-[1][1-2]-[3][0-1]$/;

	var dateRegex7 = /^[1][0-9][0-9]-[1-9]-[1-9]$/;
	var dateRegex8 = /^[1][0-9][0-9]-[1-9]-[1-2][0-9]$/;
	var dateRegex9 = /^[1][0-9][0-9]-[1-9]-[3][0-1]$/;
	var dateRegex10 = /^[1][0-9][0-9]-[1][1-2]-[1-9]$/;
	var dateRegex11 = /^[1][0-9][0-9]-[1][1-2]-[1-2][0-9]$/;
	var dateRegex12 = /^[1][0-9][0-9]-[1][1-2]-[3][0-1]$/;

	var dateRegex13 = /^[0-9][0-9][0-9][0-9]-[1-9]-[1-9]$/;
	var dateRegex14 = /^[0-9][0-9][0-9][0-9]-[1-9]-[1-2][0-9]$/;
	var dateRegex15 = /^[0-9][0-9][0-9][0-9]-[3][0-1]$/;
	var dateRegex16 = /^[0-9][0-9][0-9][0-9]-[1][1-2]-[1-9]$/;
	var dateRegex17 = /^[0-9][0-9][0-9][0-9]-[1][1-2]-[1-2][0-9]$/;
	var dateRegex18 = /^[0-9][0-9][0-9][0-9]-[1][1-2]-[3][0-1]$/;

	var unixRegex = /^(\d{13})$/;
	
	if(dateRegex1.test(myReceivedDate) || dateRegex2.test(myReceivedDate) || dateRegex3.test(myReceivedDate)
		|| dateRegex4.test(myReceivedDate) || dateRegex5.test(myReceivedDate) || dateRegex6.test(myReceivedDate)
		|| dateRegex7.test(myReceivedDate) || dateRegex8.test(myReceivedDate)
		|| dateRegex9.test(myReceivedDate) || dateRegex10.test(myReceivedDate)
		|| dateRegex11.test(myReceivedDate) || dateRegex12.test(myReceivedDate)
		|| dateRegex13.test(myReceivedDate) || dateRegex14.test(myReceivedDate)
		|| dateRegex15.test(myReceivedDate) || dateRegex16.test(myReceivedDate)
		|| dateRegex17.test(myReceivedDate) || dateRegex18.test(myReceivedDate)){
		
			var unixt = Math.round((new Date(myReceivedDate)).getTime() / 1000);
			var dateStrArray = myReceivedDate.split("-");
			console.log("Array0" + dateStrArray[0])
			var dateUTC = new Date(Date.UTC(dateStrArray[0],dateStrArray[1]-1,dateStrArray[2]));
			var utct = dateUTC.toUTCString()
			
			//res.json({"unix": `${Number(unixt)}`, "utc":`${utct}`});
			res.json({unix: Number(unixt*1000), utc:utct.toString()});
		
	}
	else if (unixRegex.test(myReceivedDate)){
		console.log('unixnumbergiven');
		var unixnumber = Number(myReceivedDate);
		var unixnumberdateObj = new Date(unixnumber);
		var utct = unixnumberdateObj.toUTCString();
		console.log(utct);

		res.json({unix: Number(myReceivedDate), utc:`${utct}`});
	}
	else if(new Date(myReceivedDate) != "Invalid Date"){
		var vdate = new Date(myReceivedDate);
		const curDateYear = vdate.getFullYear();
		const curDateMonth = vdate.getMonth();
		const curDateDay = vdate.getDate();
		var unixt = Math.round((vdate.getTime()));
		res.json({unix: Number(unixt), utc:vdate.toUTCString()});

	}
	else{
		res.json({ error : "Invalid Date" });
	}

}


function respondCurrentTimeStamp(req, res){
	
	const curDate = new Date();
	const curDateYear = curDate.getFullYear();
	const curDateMonth = curDate.getMonth();
	const curDateDay = curDate.getDate();
	const curHr = curDate.getHours();
	const curMin = curDate.getMinutes();
	const curSec = curDate.getSeconds();

	var utcStr = new Date(Date.UTC(curDateYear,curDateMonth+1,curDateDay,curHr, curMin, curSec)).toUTCString();
	const curDateTime = new Date().getTime();
	res.json({"unix": Number(curDateTime), "utc":curDate.toUTCString()})	
}


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//PUT HERE THE API OF THE CHALLENGE
app.get("/api/:date", respondTimeStamp);
app.get("/api", respondCurrentTimeStamp);


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
