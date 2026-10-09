const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const base = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  let pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let relative = pathname.replace(/^\/+/, '');
  if (relative.startsWith('assets/')) relative = path.join('public', relative);
  let filename = path.join(base, relative);
  if (!filename.startsWith(base)) { res.writeHead(403); return res.end('Forbidden'); }
  if (!fs.existsSync(filename) || fs.statSync(filename).isDirectory()) filename = path.join(base,'index.html');
  res.writeHead(200, {'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-store'});
  fs.createReadStream(filename).pipe(res);
}).listen(4174,'127.0.0.1',()=>console.log('AWM demo running at http://localhost:4174'));
