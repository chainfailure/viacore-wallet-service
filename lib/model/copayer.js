'use strict';

var _ = require('lodash');
var util = require('util');

var Bitcore = require('bitcore');
var HDPublicKey = Bitcore.HDPublicKey;

var Addressable = require('./Addressable');


var VERSION = '1.0.0';
var MESSAGE_SIGNING_PATH = "m/1/0";

function Copayer(opts) {
  opts = opts || {};
  opts.copayerIndex = opts.copayerIndex || 0;
  Copayer.super_.apply(this, [opts]);

  this.version = VERSION;
  this.createdOn = Math.floor(Date.now() / 1000);
  this.id = opts.id;
  this.name = opts.name;
  this.xPubKey = opts.xPubKey;
  this.xPubKeySignature = opts.xPubKeySignature; // So third parties can check independently
  this.signingPubKey = opts.signingPubKey || this.getSigningPubKey();
};

util.inherits(Copayer, Addressable);

Copayer.prototype.getSigningPubKey = function() {
  if (!this.xPubKey) return null;
  return HDPublicKey.fromString(this.xPubKey).derive(MESSAGE_SIGNING_PATH).publicKey.toString();
};

Copayer.fromObj = function(obj) {
  var x = new Copayer();

  x.createdOn = obj.createdOn;
  x.id = obj.id;
  x.name = obj.name;
  x.xPubKey = obj.xPubKey;
  x.xPubKeySignature = obj.xPubKeySignature;
  x.signingPubKey = obj.signingPubKey;

  Wallet.super_.prototype.fromObj.apply(this, [obj]);
  return x;
};

module.exports = Copayer;