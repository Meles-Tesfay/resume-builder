const cp = require('child_process');
const p = cp.spawn('node', ['server.js'], {cwd: 'e:/Projects/resume builder/server'});
p.stdout.on('data', d => console.log('SERVER OUT:', d.toString()));
p.stderr.on('data', d => console.log('SERVER ERR:', d.toString()));
setTimeout(() => {
  cp.exec('curl -s -X POST http://localhost:3000/api/users/login -H "Content-Type: application/json" -d "{\\"email\\":\\"test@test.com\\",\\"password\\":\\"123\\"}"', (err, stdout, stderr) => {
    console.log('CURL OUTPUT:', stdout);
    console.log('CURL ERR:', stderr);
    p.kill();
  });
}, 2000);
