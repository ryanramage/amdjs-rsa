if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
    var rsa = require('./lib/rsa');
    var base64 = require('./lib/base64');
    var x509 = require('./lib/X509');
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

    my.publicKeyFromString = function(string)
    {
        var N = base64.b64to16(string.split("|")[0]);
        var E = "03";
        var rsa = new rsa.RSAKey();
        rsa.setPublic(N, E);
        return rsa
    }

    // Returns the ascii-armored version of the public key.
    my.publicKeyString = function(rsakey)
    {
        var pubkey = base64.hex2b64(rsakey.n.toString(16));
        return pubkey;
    }

    my.publicKeyFromX509 = function(string) {
        var public = new x509.X509();
        public.readCertPEM(string);
        return public;
    }




    return my;
});