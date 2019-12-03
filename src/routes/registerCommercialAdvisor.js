const { Router } = require('express');
const router = Router();
const ca = require('../model/commercialAdvisor');
const csvSplitStream = require('csv-split-stream');
//----------------------------------------------------
//                 Registro
//----------------------------------------------------

var activeCA = [];

router.post('/init',(req,res)=>{
    const {id,money,userName} = req.body;
    const newCA = new ca(id,money,userName);
    activeCA.push(newCA);
    res.json({status: true});
});

//----------------------------------------------------
//               OrganizarCSV
//----------------------------------------------------

//Reader file 
var path = require('path');
var csvFilePath = path.join(__dirname, '..', 'sources', 'data.csv');
const FileSystem= require("fs");

router.get('/split',(req,res)=>{

    const {id} = req.body;

    csvSplitStream.split(
        FileSystem.createReadStream(csvFilePath),
        {
          lineLimit: 100
        },
        FileSystem.createWriteStream(`${__dirname}/../sources/${id}.csv`)
      )
      .then(csvSplitResponse => {
        console.log('csvSplitStream succeeded.', csvSplitResponse);
      }).catch(csvSplitError => {
        console.log('csvSplitStream failed!', csvSplitError);
      });

      res.send('ok')
});

module.exports = router;