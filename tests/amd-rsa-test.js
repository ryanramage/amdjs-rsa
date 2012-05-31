var test = require('tap').test;
var rsa = require('../rsa.js');
var fs = require('fs');

test('Simple generate', function(t){
    rsa.generate("The Moon is a Harsh Mistress.", {}, function(err, key){
        t.notOk(err);
        t.end();
    });
});

test('With useEntropy false, and the same seed, the same key should be generated', function(t){
    rsa.generate("The Moon is a Harsh Mistress.", {useEntropy:false}, function(err, key){
        t.notOk(err);
        var public1 = rsa.publicKeyString(key);
        rsa.generate("The Moon is a Harsh Mistress.", {useEntropy:false}, function(err, key){
            t.notOk(err);
            var public2 = rsa.publicKeyString(key);
            t.equal(public1, public2, "Public keys are the same");
        });

        t.end();
    });
});

test('With useEntropy false, and the different seed, a different key should be generated', function(t){
    rsa.generate("The Moon is a Harsh Mistress.", {useEntropy:false}, function(err, key){
        t.notOk(err);
        var public1 = rsa.publicKeyString(key);
        rsa.generate("The Moon is a Round Mistress.", {useEntropy:false}, function(err, key){
            t.notOk(err);
            var public2 = rsa.publicKeyString(key);
            t.notEqual(public1, public2, "Public keys are the same");
        });

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

            console.log(public_x509.getSubjectString());
            console.log(public_x509.getIssuerString());
            public2 = rsa.publicKeyString(public_x509.subjectPublicKeyRSA);

            t.equal(public1, public2, "Internal public keys dervived from private and public are same");

            t.end();
        });
    })


});

