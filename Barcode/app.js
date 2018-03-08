var express = require('express');
const bwipjs = require('bwip-js');
var fs = require('fs');
const makeDir = require('make-dir');
var app = express();

var port = process.env.port || 2200;

var aa='091392837489347';
var dircreate='upc/'+aa+'/';
app.get('/',function(req,res){
    Promise.all([
        makeDir(dircreate)
    ]).then(paths => {
        console.log(paths);
    });

    bwipjs.toBuffer({
        bcid:        'code128',       
        text:        aa,       
        scale:       3,               
        height:      10,              
        includetext: true,            
        textxalign:  'center',        
    }, function (err, png) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            console.log(png);
            fs.writeFile('upc/'+aa+'/'+aa+".png", png, 'base64', function(err) {
                console.log(err);
                res.end(png);
            });         
        }
    });
});

app.listen(port);
console.log("App listening on port " + port);