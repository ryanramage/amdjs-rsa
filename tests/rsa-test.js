var test = require('tap').test;
var rsa = require('../lib/rsa.js');



test('Big Decimal constructor', function(t){

    var key = new rsa.RSAKey();
    key.generate(1024, "03");

    console.log(key);


    t.end();

});
