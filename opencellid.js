var http = require('http');
var sqlite3 = require('sqlite3');
var Path = require('path');
var Url = require('url');
var db = new sqlite3.Database(Path.join(__dirname, 'cells.sqlite'));

http.createServer(function(req, res) {
  var url = Url.parse(req.url, true);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'GET' && url.pathname === '/') {
    if (!url.query.mcc || !url.query.mnc || !url.query.lac || !url.query.cellid) {
      res.writeHead(404);
      return res.end('Need mcc, mnc, lac, cellid passed in as query parameters');
    }
    db.all('SELECT lat, lon, range FROM cell WHERE mcc = ? AND mnc = ? AND lac = ? AND cellid = ?', {
      1: url.query.mcc,
      2: url.query.mnc,
      3: url.query.lac,
      4: url.query.cellid
    }, function(err, rows) {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify(err));
        return;
      }

      // @todo handle 0 rows properly and check dataset whether more than
      // 1 is actually possible
      if (rows.length !== 1) {
        res.writeHead(500);
        res.end('Expected 1 row, but got', rows.length);
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json  ' });
      res.end(JSON.stringify(rows[0]));
    });
  }
  else {
    res.writeHead(404);
    res.end('Nothing to see here');
  }

}).listen(process.env.PORT || 5265, process.env.IP || '0.0.0.0');

process.on('exit', function() {
  db.close();
});

console.log('Running at port', process.env.PORT || 5265);
