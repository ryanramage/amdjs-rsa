var test = require('tap').test;
var jsbn = require('../lib/jsbn.js');



test('Big Decimal constructor', function(t){
    var bd = new jsbn.BigInteger();
    t.end();

});

