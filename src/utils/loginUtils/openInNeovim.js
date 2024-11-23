const { spawn } = require('child_process');

function openInNeovim(directory) {
  spawn('nvim', [directory], { stdio: 'inherit' });
}

module.exports = { openInNeovim };
