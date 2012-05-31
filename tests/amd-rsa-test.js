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

test('Confirm public and private generate same internal public key string', function(t) {


    t.plan(1);
    fs.readFile('./sample_certs/mycert1.pem', function(err, data){
        var private = rsa.privateFromPEM(data.toString());
        var public1 = rsa.publicKeyString(private);

        fs.readFile('./sample_certs/mycert1-pub.pem', function(err, data){
            var public_x509 = rsa.publicKeyFromX509(data.toString());

            public2 = rsa.publicKeyString(public_x509.subjectPublicKeyRSA);

            t.equal(public1, public2, "Internal public keys dervived from private and public are same");

            t.end();
        });
    })


});

