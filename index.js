var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express();

app.get('/scrape', function(req, res) {
  var url = 'http://pocae.tstgo.cl/PortalCAE-WAR-MODULE/SesionPortalServlet?accion=6&NumDistribuidor=99&NomUsuario=usuInternet&NomHost=AFT&NomDominio=aft.cl&RutUsuario=0&Trx=&bloqueable=&NumTarjeta=';

  //url += '14679088';

  url += req.query.tarjeta;

  request.post(url, function(err, resp, body) {
    var $ = cheerio.load(body);
    var regex = /^\$[0-9]*/;
    var balance = $('td').filter(function() {
      return regex.test($.text([this]));
    });
    res.send(balance.html());
  });
});

app.listen('8080');

exports = module.exports = app;
