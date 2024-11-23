const os = require('os');
const { spawn } = require('child_process');
const chalk = require('chalk');

function openInTerminal(directory) {
  const platform = os.platform();

  if (platform === 'darwin') {
    // macOS
    spawn('open', ['-a', 'Terminal', directory]);
  } else if (platform === 'win32') {
    // Windows
    spawn('cmd.exe', ['/c', 'start', 'cmd.exe', '/K', `cd /d ${directory}`], {
      shell: true,
    });
  } else if (platform === 'linux') {
    // Linux
    spawn('gnome-terminal', ['--working-directory=' + directory]);
  } else {
    console.log(
      chalk.red(
        'Unsupported platform. Please manually navigate to the directory.'
      )
    );
  }
}

module.exports = { openInTerminal };
