var _ = require('lodash');

var provider = {
  name: 'BitPay',
  url: 'https://rates.viacoin.org/api/rates/',
  parseFn: function(raw) {
    var rates = _.compact(_.map(raw, function(d) {
      if (!d.code || !d.rate) return null;
      return {
        code: d.code,
        value: d.rate,
      };
    }));
    return rates;
  },
};

module.exports = provider;
