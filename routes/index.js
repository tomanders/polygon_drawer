var express = require('express');
var router = express.Router();
var xlsx = require('xlsx');

/* GET home page. */
router.get('/', function(req, res) {    
    res.render('index', { title: 'Upload the excel file please' });
    
});

router.post('/', function(req, res){
    var polygons = [];
    
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

    res.render('index', {
        title : 'Displaying',
        filename : req.files.fileUploaded.originalname,
        mapdata : JSON.stringify(polygons)
    });
    
});

module.exports = router;
