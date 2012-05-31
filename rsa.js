if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
    var rsa = require('./lib/rsa');

    var my = {};

    my.generate = function(passphrase, options, callback) {
        var options = options || {};
        if (!options.bits) options.bits = 1024;
        if (!options.useEntropy) options.useEntropy = true;
        if (!options.seed) options.seed = 'tst'; //sha256.hex(passphrase)

        try {
            rsa.Math.seedrandom(options.seed, options.useEntropy);
            var key = new rsa.RSAKey()
            key.generate(options.bits, "03");
            callback(null, key);
        } catch(e) {
            callback(e);
        }
    }

    my.privateFromPEM = function(string) {
        var key = new rsa.RSAKey();
        key.readPrivateKeyFromPEMString(string);
        return key;
    }



    return my;
});