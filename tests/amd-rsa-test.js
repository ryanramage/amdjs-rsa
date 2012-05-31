var test = require('tap').test;
var rsa = require('../rsa.js');
var fs = require('fs');

test('Big Decimal constructor', function(t){


    rsa.generate("The Moon is a Harsh Mistress.", {}, function(err, rsa){
        t.notOk(err);
        //console.log(rsa);
        t.end();
    });


});

test('Read Private RSA key', function(t) {

    var private_key = fs.readFile('./sample_certs/test_rsa.prv.pem', function(err, data){
        console.log(data.toString());
        var private = rsa.privateFromPEM(data.toString());
        console.log(private);

        t.end();
    })


});
