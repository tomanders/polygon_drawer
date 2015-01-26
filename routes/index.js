var express = require('express');
var router = express.Router();
var http = require('http');
// var client = require('http');
// var xlsx = require('xlsx');

/* GET home page. */
router.get('/', function(req, res) {    
    res.render('index', { title: 'Enter VIN to see car history' });
    
});

router.post('/', function(req, res){
    var vin = req.body.vin;
    var actions = null;
    if (vin != null && vin.length && vin.length > 0) {
        var options = {
            hostname: 'bou-ats-traci.prodno.osl.basefarm.net',
            port: 8000,
            path: '/ats/car/' + vin + '/action',
            headers: {
                'Authorization': 'Basic Q19OUDpEcmFtbWVuNjk='
            }
        };

        //'http://bou-ats-traci.prodno.osl.basefarm.net:8000/ats/car/' + vin + '/action'

        http.get(options, function(response) {
            console.log("Got response: " + response.statusCode);
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                debugger;
                var parsed = JSON.parse(body);
                actions = parsed;
                res.render('index', {
                    title : 'Displaying car history',
                    mapdata : JSON.stringify(actions)
                });
            });
        }).on('error', function(e) {
            debugger;
            console.log("Got error: " + e.message);
        });
    }
    // var options = {
    //     hostname: 'host.tld',
    //     path: '/{uri}',
    //     method: 'GET', //POST,PUT,DELETE etc
    //     port: 80,
    //     headers: {} //
    // };

    // pRequest    = client.request(options, function(response){
    //     console.log("Code: "+response.statusCode+ "\n Headers: "+response.headers);
    //     response.on('data', function (chunk) {
    //         console.log(chunk);
    //     });
    //     response.on('end',function(){
    //         console.log("\nResponse ended\n");
    //     });
    //     response.on('error', function(err){
    //         console.log("Error Occurred: " + err.message);
    //     });
    // });

    // var req = http.request(options, function(res) {
    //     if (res.statusCode === 200)
    // });

/*    var polygons = [];
    
    var workbook = xlsx.readFile(req.files.fileUploaded.path);
    console.log(req.files.fileUploaded);
    var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        var jsonsheet = xlsx.utils.sheet_to_json(worksheet);
        jsonsheet.forEach(function(location){
            var poly = {name : location['Beskrivelse Lokasjon (som levert fra ATS)']};
            poly['id'] = location['Location'];
            poly['points'] = [
                {
				    latitude: location['X1'],
				    longitude: location['Y1']
			    },
                {
				    latitude: location['X2'],
				    longitude: location['Y2']
			    },
                {
				    latitude: location['X3'],
				    longitude: location['Y3']
			    },
                {
				    latitude: location['X4'],
				    longitude: location['Y4']
			    },
                {
				    latitude: location['X1'],
				    longitude: location['Y1']
			    }                
            ];
            polygons.push(poly);            
        });
        
    });
*/
    // res.render('index', {
    //     title : 'Displaying car history',
    //     // filename : req.files.fileUploaded.originalname,
    //     mapdata : JSON.stringify(actions)
    // });
    
});

module.exports = router;
