const { spawn } = require('child_process');

function openInVSCode(directory, stdioOption) {
  spawn('code', [directory], { stdio: 'inherit' });
}

module.exports = { openInVSCode };

