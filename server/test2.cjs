const http = require('http');
const cp = require('child_process');

const serverProc = cp.spawn('node', ['server.js'], {cwd: 'e:/Projects/resume builder/server'});

serverProc.stdout.on('data', d => console.log('SERVER STDOUT:', d.toString()));
serverProc.stderr.on('data', d => console.log('SERVER STDERR:', d.toString()));

setTimeout(() => {
  const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/users/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log('STATUS:', res.statusCode);
      console.log('HEADERS:', res.headers);
      console.log('BODY:', body);
      serverProc.kill();
    });
  });

  req.on('error', (e) => {
    console.error('REQUEST ERROR:', e);
    serverProc.kill();
  });

  req.write(JSON.stringify({email: 'test@test.com', password: 'password123'}));
  req.end();

}, 3000);
