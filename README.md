jsrsasign
=========

The &#39;jsrsasign&#39; (RSA-Sign JavaScript Library) is a open source free pure JavaScript implementation of PKCS#1 v2.1 RSASSA-PKCS1-v1_5 RSA signing and validation algorithm.

Public page is http://kjur.github.com/jsrsasign .



How to generate a compatible public/private key:
================================================

Generate a public key certificate in mycert1-pub.pem and a new private key in mycert1.pem

```
openssl req   -x509 -nodes -days 365   -newkey rsa:1024 -keyout mycert1.pem -out mycert1-pub.pem
```
