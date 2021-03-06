var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express();
    port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/balance/:number', function(req, res) {

  var protocol = 'http://',
      url = 'pocae.tstgo.cl/PortalCAE-WAR-MODULE/SesionPortalServlet',
      params = '?accion=6&NumDistribuidor=99&NomUsuario=usuInternet&NomHost=AFT&NomDominio=aft.cl&RutUsuario=0&Trx=&bloqueable=&NumTarjeta=';
      remoteHost = [protocol, url, params, req.params.number].join('');

  request.post(remoteHost, function(err, response, body) {
    var $ = cheerio.load(body),
        regex = /^\$[0-9]*/;

    var balanceContainer = $('td').filter(function() {
      return regex.test($.text([this]));
    });

    var balance = balanceContainer.html(),
        statusCode = balance ? 200 : 404;

    var responseObj = { balance: balance };

    res.status(statusCode).json(responseObj);
  });
});

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port);

exports = module.exports = app;
