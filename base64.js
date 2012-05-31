
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['require', './jsbn'], function(require) {

    var jsbn = require('./jsbn');
    var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var b64pad="=";
    var my = {};

my.hex2b64 = function (h) {
  var i;
  var c;
  var ret = "";
  for(i = 0; i+3 <= h.length; i+=3) {
    c = parseInt(h.substring(i,i+3),16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if(i+1 == h.length) {
    c = parseInt(h.substring(i,i+1),16);
    ret += b64map.charAt(c << 2);
  }
  else if(i+2 == h.length) {
    c = parseInt(h.substring(i,i+2),16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while((ret.length & 3) > 0) ret += b64pad;
  return ret;
}

// convert a base64 string to hex
my.b64tohex = function (s) {
  var ret = ""
  var i;
  var k = 0; // b64 state, 0-3
  var slop;
  for(i = 0; i < s.length; ++i) {
    if(s.charAt(i) == b64pad) break;
    v = b64map.indexOf(s.charAt(i));
    if(v < 0) continue;
    if(k == 0) {
      ret += jsbn.int2char(v >> 2);
      slop = v & 3;
      k = 1;
    }
    else if(k == 1) {
      ret += jsbn.int2char((slop << 2) | (v >> 4));
      slop = v & 0xf;
      k = 2;
    }
    else if(k == 2) {
      ret += jsbn.int2char(slop);
      ret += jsbn.int2char(v >> 2);
      slop = v & 3;
      k = 3;
    }
    else {
      ret += jsbn.int2char((slop << 2) | (v >> 4));
      ret += jsbn.int2char(v & 0xf);
      k = 0;
    }
  }
  if(k == 1)
    ret += jsbn.int2char(slop << 2);
  return ret;
}

// convert a base64 string to a byte/number array
my.b64toBA = function (s) {
  //piggyback on b64tohex for now, optimize later
  var h = b64tohex(s);
  var i;
  var a = new Array();
  for(i = 0; 2*i < h.length; ++i) {
    a[i] = parseInt(h.substring(2*i,2*i+2),16);
  }
  return a;
}

my.b64to16 = function(s) {
    var ret = "";
    var i;
    var k = 0;
    var slop;
    for (i = 0; i < s.length; ++i)
    {
        if (s.charAt(i) == "=") break;
        v = b64map.indexOf(s.charAt(i));
        if (v < 0) continue;
        if (k == 0)
        {
            ret += jsbn.int2char(v >> 2);
            slop = v & 3;
            k = 1;
        }
        else if (k == 1)
        {
            ret += jsbn.int2char((slop << 2) | (v >> 4));
            slop = v & 0xf;
            k = 2;
        }
        else if (k == 2)
        {
            ret += jsb.int2char(slop);
            ret += jsbn.int2char(v >> 2);
            slop = v & 3;
            k = 3;
        }
        else
        {
            ret += jsbn.int2char((slop << 2) | (v >> 4));
            ret += jsbn.int2char(v & 0xf);
            k = 0;
        }
    }
    if (k == 1) ret += jsbn.int2char(slop << 2);
    return ret;
}

    return my;
});