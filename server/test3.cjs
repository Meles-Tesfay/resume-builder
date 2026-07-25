const cp = require('child_process');
const http = require('http');

console.log('Starting server...');
const serverProc = cp.spawn('node', ['server.js'], {cwd: 'e:/Projects/resume builder/server'});

serverProc.stdout.on('data', d => {
  const msg = d.toString();
  console.log('SERVER STDOUT:', msg);
  if (msg.includes('running on port') || msg.includes('connected')) {
    setTimeout(makeRequest, 1000);
  }
});
serverProc.stderr.on('data', d => console.log('SERVER STDERR:', d.toString()));

function makeRequest() {
  console.log('Making request...');
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
}
