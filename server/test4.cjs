const http = require('http');
const cp = require('child_process');
const serverProc = cp.spawn('node', ['server.js'], {cwd: 'e:/Projects/resume builder/server'});
serverProc.stdout.on('data', d => {
  if (d.toString().includes('running on port')) {
    const data = JSON.stringify({name: 'Test', email: 'test500@test.com', password: 'password123'});
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/users/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        console.log('REGISTER STATUS:', res.statusCode);
        console.log('REGISTER BODY:', body);
        serverProc.kill();
      });
    });
    req.write(data);
    req.end();
  }
});
serverProc.stderr.on('data', d => console.log('SERVER ERR:', d.toString()));
