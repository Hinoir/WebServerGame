const { Router } = require('express');
const router = Router();
const index = 1;
//Reader file 
var path = require('path');
var csvFilePath = path.join(__dirname, '..', 'sources', `data${index}.csv`);
const CSVToJSON= require("csvtojson");
const JSONToCSV= require("json2csv");
const FileSystem= require("fs");

//Route
router.get('/get',function(req,res){
    CSVToJSON().fromFile(csvFilePath).then(source =>{
        index = index+1;
        res.json(source);
    });
});

module.exports = router;