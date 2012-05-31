if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}

define(['require', './rsa-tools/rsa_api', './rsa-tools/base64',  './rsa-tools/x509',  './rsa-tools/sha256'], function(require) {
    var rsa = require('./rsa-tools/rsa_api');
    var base64 = require('./rsa-tools/base64');
    var x509 = require('./rsa-tools/x509');
    var sha256 = require('./rsa-tools/sha256')
    var my = {};

    my.generate = function(seed, options, callback) {
        var options = options || {};
        if (!options.bits) options.bits = 1024;
        if (options.useEntropy === undefined) options.useEntropy = true;

        var hashed_seed = sha256.hex_sha256(seed)
        try {
            rsa.Math.seedrandom(hashed_seed, options.useEntropy);
            var key = new rsa.RSAKey()
            key.generate(options.bits, "03");
            callback(null, key);
        } catch(e) {
            callback(e);
        }
    }

    my.generateSync = function(seed, options) {
        var options = options || {};
        if (!options.bits) options.bits = 1024;
        if (options.useEntropy === undefined) options.useEntropy = true;

        var hashed_seed = sha256.hex_sha256(seed)

        rsa.Math.seedrandom(hashed_seed, options.useEntropy);
        var key = new rsa.RSAKey()
        key.generate(options.bits, "03");
        return key;

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