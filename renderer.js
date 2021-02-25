// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const ipcRenderer = require('electron').ipcRenderer;
const remote = require('electron').remote;

function writeTextFile(filepath, fileString) {
  return new Promise((resolve) => {
    var util = require('util');
    var fs = require('fs');

    const writeFile = util.promisify(fs.writeFile);

    writeFile(filepath, fileString)

    resolve('file generated')
  })
}

const txtFileName = document.getElementById('txt-file-name');
const cameraName = document.getElementById('camera-name');
const rollName = document.getElementById('roll-name');

const btn = document.querySelector('button');
btn.addEventListener('click', (event) => {

  const fileString = 'Camera: ' + cameraName.value + '\r\n'
                    + 'Film: ' + rollName.value + '\r\n'

  // Get current folder path
  let folderPath = remote.getGlobal('sharedObject').prop1
  folderPath = folderPath.toString().split(',')[1]
  const txtFolderPath = folderPath + '/' + txtFileName.value + '.txt'

  writeTextFile(txtFolderPath, fileString).then(() => {
    // channel name: close-main-widow
    ipcRenderer.send('close-main-window');
  })
})
